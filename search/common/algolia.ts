import algoliasearch, { SearchIndex } from 'algoliasearch'
import { Settings } from '@algolia/client-search'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { getAlgoliaApiKey, getAlgoliaAppId } from './env'

const algoliaSearchCurried = (appId: string) => (apiKey: string) => algoliasearch(appId, apiKey)

// Init one particular index
// TODO: If we are using multiple indexes, this needs to be refactored
type InitType = (indexName: string) => E.Either<string, SearchIndex>
const init: InitType = (indexName) =>
  pipe(
    getAlgoliaAppId(),
    E.map(algoliaSearchCurried),
    E.chain((algoliaSearch) => pipe(getAlgoliaApiKey(), E.map(algoliaSearch))),
    E.map((client) => client.initIndex(indexName)),
  )

// Push to Algolia index
type UpdateIndexType = (
  data: readonly Readonly<Record<string, string>>[],
) => (index: SearchIndex) => TE.TaskEither<Error, SearchIndex>
const updateIndex: UpdateIndexType = (data) => (index) =>
  pipe(
    TE.tryCatch(() => index.saveObjects(data), (error) => new Error(`Unable to update index. Error message: ${JSON.stringify(error)}`)),
    //TE.map((response) => `Number of objects updated: ${response.objectIDs.length}`),
    TE.map(() => index),
  )

type UpdateSettingsType = (settings: Settings) => (index: SearchIndex) => TE.TaskEither<Error, SearchIndex>
export const updateSettings: UpdateSettingsType = (settings) => (index) =>
  pipe(
    TE.tryCatch(() => index.setSettings(settings), (error) => new Error(`Unable to update settings: Error message: ${JSON.stringify(error)}`)),
    TE.map(() => index),
  )

type UpdateType = (
  indexName: string,
) => (
  indexSettings: Settings,
) => (mappedData: Readonly<Record<string, string>>[]) => TE.TaskEither<string | Error, string>
export const update: UpdateType = (indexName) => (indexSettings) => (mappedData: Readonly<Record<string, string>>[]) =>
  pipe(
    init(indexName),
    TE.fromEither,
    TE.chainW(updateIndex(mappedData)),
    TE.chainW(updateSettings(indexSettings)),
    TE.map(() => `Index ${indexName} successfully updated`),
  )

type PrefixEnvType = (environment: string) => string
export const prefixEnv: PrefixEnvType = (environment) => environment.slice(0, 3) // Not very sophisticated. Perhaps make more robust at some point.

type GenerateIndexNameType = (identifier: string) => (language: string) => (environment: string) => string
export const generateIndexName: GenerateIndexNameType = (identifier) => (language) => (environment) =>
  pipe(prefixEnv(environment), (prefixedEnv) => `${prefixedEnv.toLowerCase()}_${identifier}_${language}`)
