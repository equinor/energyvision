import { Algoliasearch,algoliasearch , BatchResponse, IndexSettings} from 'algoliasearch'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { getAlgoliaApiKey, getAlgoliaAppId } from './env'
import { IndexType } from '../common'

const algoliaSearchCurried = (appId: string) => (apiKey: string) => algoliasearch(appId, apiKey)

// Init one particular index
// TODO: If we are using multiple indexes, this needs to be refactored
type InitType = () => E.Either<string, Algoliasearch>
const init: InitType = () =>
  pipe(
    getAlgoliaAppId(),
    E.map(algoliaSearchCurried),
    E.chain((algoliaSearch) => pipe(getAlgoliaApiKey(), E.map(algoliaSearch))),
    E.map((client) => client),
  )

// Push to Algolia index
type UpdateIndexType = (data: readonly IndexType[], index:string) => (client: Algoliasearch) => TE.TaskEither<Error, BatchResponse[]>
const updateIndex: UpdateIndexType = (data, index) => (client) =>
  pipe(
    TE.tryCatch(
      () => client.saveObjects({indexName:index, objects: data as unknown as  Record<string,unknown>[]}),
      (error) => new Error(`Unable to update index. Error message: ${JSON.stringify(error)}`),
    ),
    TE.map((response) => response),
  )

// Delete from Algolia index
type DeleteIndexType = (slug: string, index:string) => (client:Algoliasearch) => TE.TaskEither<Error, string>
const deleteIndex: DeleteIndexType = (slug, index) => (client) =>
  pipe(
    TE.tryCatch(
      () => client.deleteBy({indexName:index, deleteByParams: { filters: `slug:'${slug}'` }}),
      (error) => new Error(`Unable to delete index. Error message: ${JSON.stringify(error)}`),
    ),
    TE.map((updatedAtResponse) => `Deleted at ${updatedAtResponse.updatedAt}`),
  )

type UpdateSettingsType = (settings: IndexSettings, index:string) => (client: Algoliasearch) => TE.TaskEither<Error, Algoliasearch>
export const updateSettings: UpdateSettingsType = (settings, index) => (client) =>
  pipe(
    TE.tryCatch(
      () => client.setSettings({indexName:index, indexSettings: settings}),
      (error) => new Error(`Unable to update settings: Error message: ${JSON.stringify(error)}`),
    ),
    TE.map(() => client),
  )

type UpdateType = (
  indexName: string,
) => (indexSettings: IndexSettings) => (mappedData: readonly IndexType[]) => TE.TaskEither<string | Error, number[]>
export const update: UpdateType = (indexName) => (indexSettings) => (mappedData) =>
  pipe(
    init(),
    TE.fromEither,
    TE.chainW(updateSettings(indexSettings, indexName)),
    TE.chainW(updateIndex(mappedData, indexName)),
    TE.map((response) => response.map(it=> it.taskID)),
  )

type DeleteType = (indexName: string) => (slug: string) => TE.TaskEither<string | Error, string>
export const remove: DeleteType = (indexName) => (slug) =>
  pipe(
    init(),
    TE.fromEither,
    TE.chainW(deleteIndex(slug, indexName)),
    TE.map((message) => `${message} \n${slug} is deleted from index ${indexName} successfully`),
  )

type GenerateIndexNameType = (identifier: string) => (language: string) => (environment: string) => string
export const generateIndexName: GenerateIndexNameType = (identifier) => (language) => (environment) =>
  pipe(environment, (env) => `${env.toLowerCase()}_${identifier}_${language}`)
