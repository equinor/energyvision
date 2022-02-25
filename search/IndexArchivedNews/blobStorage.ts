import { BlobItem, BlobServiceClient, ContainerClient } from '@azure/storage-blob'

import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { flow, pipe } from 'fp-ts/lib/function'
import { BlobConfiguration, GetProcessEnvType } from '../common/types'

const getAzureConnectionString: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Azure connection string')(process.env.AZ_CONNECTION_STRING)

const getContainerName: GetProcessEnvType = () =>
  E.fromNullable('Unable to find container name')(process.env.CONTAINER_NAME)

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

type GetDocumentsType = (containerClient: ContainerClient) => TE.TaskEither<Error, BlobItem[]>
export const getDocuments: GetDocumentsType = (containerClient) =>
  TE.tryCatch(() => getDocumentsFromBlob(containerClient), E.toError)
