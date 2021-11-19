import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch'
import * as O from 'fp-ts/lib/Option'
import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'

const getAlgoliaAppId: IO.IO<O.Option<string>> = () => O.fromNullable(process.env.ALGOLIA_APP_ID)
const getAlgoliaAPIKey: IO.IO<O.Option<string>> = () => O.fromNullable(process.env.ALGOLIA_API_KEY)
//const getAlgoliaIndexName: IO.IO<O.Option<string>> = () => O.fromNullable(process.env.ALGOLIA_INDEX_NAME)

type ProceedWithApiKeyType = (appId: string) => E.Either<string, SearchClient>
const proceedWithAPIKey: ProceedWithApiKeyType = (appId) =>
  pipe(
    getAlgoliaAPIKey(),
    O.match(
      () => E.left('No API key available'),
      (apiKey) => E.right(algoliasearch(appId, apiKey)),
    ),
  )

type GetClientType = IO.IO<E.Either<string, SearchClient>>
const getClient: GetClientType = flow(
  getAlgoliaAppId,
  O.match(() => E.left('No App ID available'), proceedWithAPIKey),
)

// API for Algolia stuff
/* type InitType = () => SearchIndex
export const init: InitType = () => flow (
  getClient,
  E.match()
 )*/

// Push to Algolia index
type UpdateType = (indexName: string, value: string) => boolean
export const update: UpdateType = (indexName, value) => !!(indexName && value)
