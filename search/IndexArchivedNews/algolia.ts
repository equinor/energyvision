import algoliasearch, { SearchIndex } from 'algoliasearch'
import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'

const algoliaSearchCurried = (appId: string) => (apiKey: string) => algoliasearch(appId, apiKey)

type GetProcessEnvType = IO.IO<E.Either<string, string>>
const getAlgoliaAppId: GetProcessEnvType = () => E.fromNullable('Unable to find app id')(process.env.ALGOLIA_APP_ID)
const getAlgoliaApiKey: GetProcessEnvType = () => E.fromNullable('Un2able to find API key')(process.env.ALGOLIA_API_KEY)
const getAlgoliaIndexName: GetProcessEnvType = () =>
  E.fromNullable('Unable to find index name')(process.env.ALGOLIA_INDEX_NAME)

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
