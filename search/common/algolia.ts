import algoliasearch, { SearchIndex } from 'algoliasearch'
import { Settings } from '@algolia/client-search'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { getAlgoliaApiKey, getAlgoliaAppId } from './env'
import { IndexType } from '../common'

const algoliaSearchCurried = (appId: string) => (apiKey: string) => algoliasearch(appId, apiKey)

// Init one particular index
// TODO: If we are using multiple indexes, this needs to be refactored
type InitType = (indexName: string) => E.Either<string, SearchIndex>
const init: InitType = (indexName) => {
  console.log('Init')
  return pipe(
    getAlgoliaAppId(),
    E.map(algoliaSearchCurried),
    E.chain((algoliaSearch) => pipe(getAlgoliaApiKey(), E.map(algoliaSearch))),
    E.map((client) => client.initIndex(indexName)),
  )
}
// Push to Algolia index
type UpdateIndexType = (data: readonly IndexType[]) => (index: SearchIndex) => TE.TaskEither<Error, SearchIndex>
const updateIndex: UpdateIndexType = (data) => (index) =>
  pipe(
    TE.tryCatch(
      () => index.saveObjects(data),
      (error) => new Error(`Unable to update index. Error message: ${JSON.stringify(error)}`),
    ),
    //TE.map((response) => `Number of objects updated: ${response.objectIDs.length}`),
    TE.map(() => index),
  )

// Delete from Algolia index
type DeleteIndexType = (slug: string) => (index: SearchIndex) => TE.TaskEither<Error, SearchIndex>
const deleteIndex: DeleteIndexType = (slug) => (index) => {
  console.log('Deleting slug...')
  return pipe(
    TE.tryCatch(
      () => index.deleteBy({ filters: `slug:'${slug}'` }),
      (error) => new Error(`Unable to delete index. Error message: ${JSON.stringify(error)}`),
    ),
    TE.map(() => index),
  )
}
type UpdateSettingsType = (settings: Settings) => (index: SearchIndex) => TE.TaskEither<Error, SearchIndex>
export const updateSettings: UpdateSettingsType = (settings) => (index) =>
  pipe(
    TE.tryCatch(
      () => index.setSettings(settings),
      (error) => new Error(`Unable to update settings: Error message: ${JSON.stringify(error)}`),
    ),
    TE.map(() => index),
  )

type UpdateType = (
  indexName: string,
) => (indexSettings: Settings) => (mappedData: readonly IndexType[]) => TE.TaskEither<string | Error, string>
export const update: UpdateType = (indexName) => (indexSettings) => (mappedData) => {
  return pipe(
    init(indexName),
    TE.fromEither,
    TE.chainW(updateIndex(mappedData)),
    TE.chainW(updateSettings(indexSettings)),
    TE.map(() => `Index ${indexName} successfully updated`),
  )
}
type DeleteType = (indexName: string) => (slug: string) => TE.TaskEither<string | Error, string>
export const remove: DeleteType = (indexName) => (slug) => {
  console.log('Remove' + slug + ' ' + indexName)
  return pipe(
    init(indexName),
    TE.fromEither,
    TE.chainW(deleteIndex(slug)),
    TE.map(() => `${slug} is deleted from index ${indexName} successfully`),
  )
}
type GenerateIndexNameType = (identifier: string) => (language: string) => (environment: string) => string
export const generateIndexName: GenerateIndexNameType = (identifier) => (language) => (environment) =>
  pipe(environment, (env) => `${env.toLowerCase()}_${identifier}_${language}`)
