import { flow, pipe } from 'fp-ts/lib/function'
import { ap } from 'fp-ts/lib/Identity'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { EventIndex, update, remove, generateIndexName, getEnvironment, Language, getSanityClient } from '../../common'
import { fetchData, Event } from './sanity'
import { mapData } from './mapper'
import { indexSettings } from './algolia'

const indexIdentifier = 'EVENTS'

export const indexEvents = (language: Language) => (docId: string) => {
  const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)(language.isoCode)))
  const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))
  const removeIndexFromAlgolia = flow(indexName, E.map(remove))

  type RemoveAndMapType = (pages: Event[]) => Promise<EventIndex[]>
  const removeAndMap: RemoveAndMapType = async (pages) => {
    await Promise.all(
      pages
        .filter((page) => page.docToClear)
        .map((page) =>
          pipe(
            removeIndexFromAlgolia(),
            E.ap(E.of(page.slug)),
            TE.fromEither,
            TE.flatten,
            T.map(E.fold(console.error, console.log)),
          )(),
        ),
    )
    return pipe(pages.map(mapData))
  }

  return pipe(
    getSanityClient(),
    TE.fromEither,
    TE.chainW(fetchData(language, docId)),
    TE.chainW((pages) => TE.fromTask(() => removeAndMap(pages))),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
    T.map(E.fold(console.error, console.log)),
  )
}
