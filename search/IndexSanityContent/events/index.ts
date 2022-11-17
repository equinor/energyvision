import { flow, pipe } from 'fp-ts/lib/function'
import { ap } from 'fp-ts/lib/Identity'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { update, remove, generateIndexName, getEnvironment, Language, getSanityClient } from '../../common'
import { fetchData } from './sanity'
import { mapData } from './mapper'
import { indexSettings } from './algolia'
import { getDevEnvironment } from '../../common/env'

const indexIdentifier = 'EVENTS'

export const indexEvents = (language: Language) => (docId: string) => (isDev: boolean) => {
  const indexName = flow(
    isDev ? getDevEnvironment : getEnvironment,
    E.map(generateIndexName(indexIdentifier)(language.isoCode)),
  )
  const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))
  const removeIndexFromAlgolia = flow(indexName, E.map(remove))

  return pipe(
    getSanityClient(isDev)(),
    TE.fromEither,
    TE.chainW(fetchData(language, docId)),
    TE.map((pages) => {
      pages
        .filter((page) => page.docToClear === true)
        .map((page) =>
          pipe(
            removeIndexFromAlgolia(),
            E.ap(E.of(page.slug)),
            TE.fromEither,
            TE.flatten,
            T.map(E.fold(console.error, console.log)),
          )(),
        )
      return pages.map(mapData)
    }),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
    T.map(E.fold(console.error, console.log)),
  )
}
