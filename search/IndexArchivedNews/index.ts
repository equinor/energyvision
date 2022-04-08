import { AzureFunction, Context } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { flow, pipe } from 'fp-ts/lib/function'
import { flatten } from 'fp-ts/Array'
import { ap } from 'fp-ts/lib/Identity'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'
import { init, getClient, getDocuments, getFileList, copyFile } from './blobStorage'
import { BlobItem, ContainerClient } from '@azure/storage-blob'
import { update, sanityClient, generateIndexName, getEnvironment, languageFromIso, languageOrDefault, NewsIndex } from '../common'
import { indexSettings } from './algolia'
import { mapData } from './mapper'
import { loadJson } from './fileStorage'

const trigger: AzureFunction = async function (context: Context): Promise<void> {
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
  type UpdateFileType = (client: ContainerClient) => (fileName: string) => TE.TaskEither<Error, NewsIndex[]>
  const updateFile: UpdateFileType = (client) => (fileName) =>
    pipe(
      fileName,
      copyFile(client)('tempPath'),
      TE.chain(loadJson),
      TE.map((searchMetadataEntries) => pipe(searchMetadataEntries.map(mapData))),
    )

  // TODO: Change to work with news articles
  const foo = pipe(
    init(),
    E.map(getClient),
    TE.fromEither,
    TE.bindTo('client'),
    TE.bindW('files', ({ client }) => getFileList(language)(client)),
    //TE.chain(({ client, files }) => //Loop over files here)


    /*getFileList(language),
    fetchData(sanityClient)(language),
    TE.map((pages) => pipe(pages.map(mapData), flatten)),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
    T.map(E.fold(console.error, console.log)),*/
  )

  return foo
}

export default trigger
