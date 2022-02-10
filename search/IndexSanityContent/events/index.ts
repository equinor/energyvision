import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { update, sanityClient, generateIndexName, getEnvironment } from '../../common'
import { fetchData, query, queryParams } from './sanity'
import { mapData } from './mapper'
import { indexSettings } from './algolia'

const indexIdentifier = 'EVENTS'
const language = 'en-GB' // From where to get?

const indexName = pipe(getEnvironment(), E.map(generateIndexName(indexIdentifier)(language)))

const updateAlgolia = update(E.getOrElse(() => indexIdentifier)(indexName))(indexSettings)

export const indexEvents = pipe(
  fetchData(query)(queryParams)(sanityClient), // TODO: Make these parameters to make this function reusable
  TE.map((events) => events.map(mapData)),
  TE.chain(updateAlgolia),
  T.map(E.fold(console.error, console.log)),
)
