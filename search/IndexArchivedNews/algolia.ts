import algoliasearch, { SearchIndex } from 'algoliasearch'
import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'

const algoliaSearchCurried = (appId: string) => (apiKey: string) => algoliasearch(appId, apiKey)

type GetProcessEnvType = IO.IO<E.Either<string, string>>
const getAlgoliaAppId: GetProcessEnvType = () =>
  pipe(E.fromNullable('Unable to find app id'), (fromNullable) => fromNullable(process.env.ALGOLIA_APP_ID))
const getAlgoliaApiKey: GetProcessEnvType = () =>
  pipe(E.fromNullable('Un2able to find API key'), (fromNullable) => fromNullable(process.env.ALGOLIA_API_KEY))
const getAlgoliaIndexName: GetProcessEnvType = () =>
  pipe(E.fromNullable('Unable to find index name'), (fromNullable) => fromNullable(process.env.ALGOLIA_INDEX_NAME))

type InitFuncType = IO.IO<E.Either<string, SearchIndex>>
export const initFunc: InitFuncType = flow(
  getAlgoliaAppId,
  E.map(algoliaSearchCurried),
  E.chain((algoliaSearch) => pipe(getAlgoliaApiKey(), E.map(algoliaSearch))),
  E.chain((client) => pipe(getAlgoliaIndexName(), E.map(client.initIndex))),
)

//export const initOrDie = () => E.getOrElse(initFunc(), throw new Error())

// Push to Algolia index
type UpdateType = (indexName: string, value: string) => boolean
export const update: UpdateType = (indexName, value) => !!(indexName && value)
