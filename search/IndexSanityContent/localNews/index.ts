import { flow, pipe } from 'fp-ts/lib/function'
import { flatten } from 'fp-ts/Array'
import { ap } from 'fp-ts/lib/Identity'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { NewsIndex, update, remove, generateIndexName, Language, getSanityClient, getEnvironment } from '../../common'
import { fetchData, LocalNewsArticle } from './sanity'
import { indexSettings } from '../common/news/algolia'
import { mapData } from './mapper'
import { getDevEnvironment } from '../../common/env'

const indexIdentifier = 'NEWS'

export const indexLocalNews = (language: Language) => (docId: string) => (isDev: boolean) => {
  const indexName = flow(
    isDev ? getDevEnvironment : getEnvironment,
    E.map(generateIndexName(indexIdentifier)(language.isoCode)),
  )
  const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))
  const removeIndexFromAlgolia = flow(indexName, E.map(remove))

  type RemoveAndMapType = (pages: LocalNewsArticle[]) => NewsIndex[]
  const removeAndMap: RemoveAndMapType = (pages) => {
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
      )
    return pipe(pages.map(mapData), flatten)
  }
  
  return pipe(
    getSanityClient(isDev)(),
    TE.fromEither,
    TE.chainW(fetchData(language, docId)),
    TE.map(removeAndMap),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
    T.map(E.fold(console.error, console.log)),
  )
}
