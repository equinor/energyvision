import algoliasearch, { SearchIndex } from 'algoliasearch'
import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
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
type UpdateType = (index: SearchIndex) => (data: readonly Readonly<Record<string, never>>[]) => void
export const update: UpdateType = (index) => (data) => index.saveObjects(data).then((res) => console.log(res))
