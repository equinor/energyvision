import { pipe } from 'fp-ts/lib/function'
import { ap } from 'fp-ts/lib/Identity'
import * as A from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { MagazineArticle } from './sanity'
import { MagazineIndex } from '../../common'

type MappableObjectType = {
  _key: string
  title: string
  ingress: string
  text: string
}

type MapperFunctionType = (article: MagazineArticle) => (obj: MappableObjectType) => MagazineIndex
const mapperFunction: MapperFunctionType =
  (article) =>
  ({ _key, title, ingress, text }) => ({
    slug: article.slug,
    objectID: `${article._id}-${_key}`,
    type: 'magazine',
    pageTitle: article.title,
    title,
    ingress,
    text,
  })

type MapDataType = (article: MagazineArticle) => MagazineIndex[]
export const mapData: MapDataType = (article) =>
  pipe(mapperFunction, ap(article), (fn) =>
    pipe(
      pipe(
        O.fromNullable(article.textBlocks),
        O.map(A.map(fn)),
        O.getOrElse(() => [] as MagazineIndex[]),
      ),
      A.concat(
        pipe(
          O.fromNullable(article.accordions),
          O.map(A.map(fn)),
          O.getOrElse(() => [] as MagazineIndex[]),
        ),
      ),
      A.concat(
        pipe(
          O.fromNullable(
            article.ingress
              ? Array.of({
                  _key: `ingress`,
                  type: 'magazine',
                  pageTitle: article.title,
                  title: null,
                  ingress: article.ingress,
                  text: null,
                } as unknown as MappableObjectType)
              : null,
          ),
          O.map(A.map(fn)),
          O.getOrElse(() => [] as MagazineIndex[]),
        ),
      ),
    ),
  )
