import algoliasearch, { SearchIndex } from 'algoliasearch'
import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { flow, pipe } from 'fp-ts/lib/function'
import { GetProcessEnvType } from './types'

const algoliaSearchCurried = (appId: string) => (apiKey: string) => algoliasearch(appId, apiKey)

const getAlgoliaAppId: GetProcessEnvType = () => E.fromNullable('Unable to find app id')(process.env.ALGOLIA_APP_ID)
const getAlgoliaApiKey: GetProcessEnvType = () => E.fromNullable('Unable to find API key')(process.env.ALGOLIA_API_KEY)
const getAlgoliaIndexName: GetProcessEnvType = () =>
  E.fromNullable('Unable to find index name')(process.env.ALGOLIA_INDEX_NAME)

// Init one particular index
// TODO: If we are using multiple indexes, this needs to be refactored
type InitType = IO.IO<E.Either<string, SearchIndex>>
export const init: InitType = flow(
  getAlgoliaAppId,
  E.map(algoliaSearchCurried),
  E.chain((algoliaSearch) => pipe(getAlgoliaApiKey(), E.map(algoliaSearch))),
  E.chain((client) => pipe(getAlgoliaIndexName(), E.map(client.initIndex))),
)

// Push to Algolia index
type UpdateType = (
  data: readonly Readonly<Record<string, string>>[],
) => (index: SearchIndex) => TE.TaskEither<Error, SearchIndex>
export const update: UpdateType = (data) => (index) =>
  pipe(
    TE.tryCatch(() => index.saveObjects(data), E.toError),
    //TE.map((response) => `Number of objects updated: ${response.objectIDs.length}`),
    TE.map(() => index)
  )

//type UpdateSettingsType = (
//  settings: Settings,
//) => (index: SearchIndex) => TE.TaskEither<Error, string>
export const updateSettings/*: UpdateSettingsType*/ = (settings: object) => (index: SearchIndex) =>
  pipe(
    TE.tryCatch(() => index.setSettings(settings), E.toError),
    TE.map(() => index),
  )
