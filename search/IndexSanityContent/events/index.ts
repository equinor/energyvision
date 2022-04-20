import { flow, pipe } from 'fp-ts/lib/function'
import { ap } from 'fp-ts/lib/Identity'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { update, generateIndexName, getEnvironment, Language, getSanityClient } from '../../common'
import { fetchData } from './sanity'
import { mapData } from './mapper'
import { indexSettings } from './algolia'

const indexIdentifier = 'EVENTS'

export const indexEvents = (language: Language) => {
  const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)(language.isoCode)))
  const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))

  return pipe(
    getSanityClient(),
    TE.fromEither,
    TE.chainW(fetchData(language)),
    TE.map((events) => events.map(mapData)),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
    T.map(E.fold(console.error, console.log)),
  )
}
