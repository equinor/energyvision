import { BlobItem, BlobServiceClient, ContainerClient } from '@azure/storage-blob'

import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { flow, pipe } from 'fp-ts/lib/function'
import { BlobConfiguration } from '../common/types'
import { Language } from '../common'
import { getAzureConnectionString, getContainerName } from '../common/env'

type InitType = IO.IO<E.Either<string, BlobConfiguration>>
export const init: InitType = flow(
  getAzureConnectionString,
  E.map(BlobServiceClient.fromConnectionString),
  E.chainW((blobServiceClient: BlobServiceClient) =>
    pipe(
      getContainerName(),
      E.map((containerName) => ({ client: blobServiceClient, container: containerName } as BlobConfiguration)),
    ),
  ),
)

type GetClientType = (config: BlobConfiguration) => ContainerClient
export const getClient: GetClientType = ({ client, container }) => client.getContainerClient(container)

type GetDocumentsFromBlobType = (containerClient: ContainerClient) => Promise<BlobItem[]>
const getDocumentsFromBlob: GetDocumentsFromBlobType = async (containerClient) => {
  const iter = containerClient.listBlobsFlat()
  const result: BlobItem[] = []
  for await (const blob of iter) result.push(blob)
  // TODO: Need to handle parallel download ourselves
  // Use sequence and task to do it. But need to be clever. Don't want to do it often.
  /*const foo = containerClient.getBlockBlobClient('name')
  const bar = await foo.downloadToBuffer()*/

  return result
}

type GetSearchMetadataFilesType = (containerClient: ContainerClient) => (language: string) => Promise<string[]>
const getSearchMetadataFiles: GetSearchMetadataFilesType = (containerCLient) => async (language) => {
  const iter = containerCLient.listBlobsByHierarchy(`/metadata/${language}`)
  const result: string[] = []
  for await (const blob of iter) {
    switch (blob.kind) {
      case 'blob':
        result.push(blob.name)
    }
  }

  return result
}

type GetDocumentsType = (containerClient: ContainerClient) => TE.TaskEither<Error, BlobItem[]>
export const getDocuments: GetDocumentsType = (containerClient) =>
  TE.tryCatch(() => getDocumentsFromBlob(containerClient), E.toError)

type GetFileListType = (language: Language) => (ContainerClient: ContainerClient) => TE.TaskEither<Error, string[]>
export const getFileList: GetFileListType = (language) => (containerClient) =>
  TE.tryCatch(() => getSearchMetadataFiles(containerClient)(language.isoCode), E.toError)

type CopyFileType = (
  containerClient: ContainerClient,
) => (destinationPath: string) => (fileName: string) => TE.TaskEither<Error, string>
export const copyFile: CopyFileType = (containerClient) => (destinationPath) => (fileName) =>
  pipe(
    containerClient.getBlockBlobClient(fileName),
    (blob) => TE.tryCatch(() => blob.downloadToFile(`${destinationPath}\\${fileName}`), E.toError),
    TE.map(() => `${destinationPath}\\${fileName}`),
  )
