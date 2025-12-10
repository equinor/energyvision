import { flow, pipe, identity } from 'fp-ts/lib/function'
import { flatten } from 'fp-ts/Array'
import { ap } from 'fp-ts/lib/Identity'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import {
  MagazineIndex,
  update,
  remove,
  generateIndexName,
  getEnvironment,
  Language,
  getSanityClient,
} from '../../common'
import { fetchData, MagazineArticle } from './sanity'
import { indexSettings } from './algolia'
import { mapData } from './mapper'
import { Logger } from '@azure/functions'

const indexIdentifier = 'MAGAZINE'

export const indexMagazine = (language: Language, logger: Logger) => (docId: string) => {
  const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)(language.isoCode)))
  const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))
  const removeIndexFromAlgolia = flow(indexName, E.map(remove))

  type RemoveAndMapType = (pages: MagazineArticle[]) => Promise<MagazineIndex[]>
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
            T.map(E.fold(logger.error, logger.info)),
          )(),
        ),
    )
    return pipe(pages.map(mapData), flatten)
  }
  return pipe(
    getSanityClient(),
    TE.fromEither,
    TE.chainW(fetchData(language, docId)),
    TE.chainW((pages) => TE.fromTask(() => removeAndMap(pages))),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
     T.map(E.fold((err) => { logger.error(err) 
          return [-1] }, 
          identity) ),
  )
}
