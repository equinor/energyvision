import { flow, pipe } from 'fp-ts/lib/function'
import { flatten } from 'fp-ts/Array'
import { ap } from 'fp-ts/lib/Identity'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { update, generateIndexName, Language, getSanityClient, getEnvironment } from '../../common'
import { fetchData } from './sanity'
import { indexSettings } from '../common/news/algolia'
import { mapData } from './mapper'
import { getDevEnvironment } from '../../common/env'

const indexIdentifier = 'NEWS'

export const indexLocalNews = (language: Language) => (isDev: boolean) => {
  const indexName = flow(
    isDev ? getDevEnvironment : getEnvironment,
    E.map(generateIndexName(indexIdentifier)(language.isoCode)),
  )
  const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))

  return pipe(
    getSanityClient(isDev)(),
    TE.fromEither,
    TE.chainW(fetchData(language)),
    TE.map((pages) => pipe(pages.map(mapData), flatten)),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
    T.map(E.fold(console.error, console.log)),
  )
}
