import { AzureFunction, Context } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { flow, pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/ReadonlyArray'
import { ap } from 'fp-ts/lib/Identity'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'
import { init, getClient, getFileList, copyFile } from './blobStorage'
import { ContainerClient } from '@azure/storage-blob'
import {
  update,
  generateIndexName,
  getEnvironment,
  languageFromIso,
  languageOrDefault,
  NewsIndex,
} from '../common'
import { indexSettings } from './algolia'
import { mapData } from './mapper'
import { loadJson } from './fileStorage'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const trigger: AzureFunction = async function (_context: Context): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })
  // New trigger to be used from now on
  // TODO:
  // 1. Read list of files from somewhere. Could be httpTrigger or blobTrigger
  // 2. Read files from blobStorage and put in temporary file store for function. There should be a TempPath we can use for thos
  // 3. Parse files and make a note of which ones have been parsed. Use this later on to avoid reading same file twice

  const indexIdentifier = 'NEWS'
  // TODO: From where to get language?
  const language = pipe(languageFromIso('nb-NO'), languageOrDefault)

  const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)(language.isoCode)))
  const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))

  // Consider moving out of this file
  type MapToNewsIndexType = (client: ContainerClient) => (fileName: string) => TE.TaskEither<Error, NewsIndex[]>
  const mapToNewsIndex: MapToNewsIndexType = (client) => (fileName) =>
    pipe(
      fileName,
      copyFile(client)('tempPath'),
      TE.chain(loadJson),
      TE.map((searchMetadataEntries) => pipe(searchMetadataEntries.map(mapData))),
    )

  const indexArchivedNews = pipe(
    init(),
    E.map(getClient),
    TE.fromEither,
    TE.bindTo('client'),
    TE.bindW('files', ({ client }) => getFileList(language)(client)),
    TE.chainW(({ client, files }) => pipe(files.map(mapToNewsIndex(client)), TE.sequenceArray, TE.map(A.flatten))),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
    T.map(E.fold(console.error, console.log))
  )

  return indexArchivedNews()
}

export default trigger
