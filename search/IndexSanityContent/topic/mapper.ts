import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import { ap } from 'fp-ts/lib/Identity'
import * as O from 'fp-ts/lib/Option'
import { TopicIndex } from '../../common'
import { TopicPage } from './sanity'

type MappableObjectType = {
  _key: string
  title: string
  ingress: string
  text: string
}

type MapperFunctionType = (page: TopicPage) => (obj: MappableObjectType) => TopicIndex
const mapperFunction: MapperFunctionType =
  (page) =>
  ({ _key, title, ingress, text }) => ({
    slug: page.slug,
    objectID: `${page._id}-${_key}`,
    type: 'page',
    pageTitle: page.title,
    title,
    ingress,
    text,
  })

type MapDataType = (page: TopicPage) => TopicIndex[]
export const mapData: MapDataType = (page) =>
  pipe(mapperFunction, ap(page), (fn) =>
    pipe(
      pipe(
        O.fromNullable(page.textBlocks),
        O.map(A.map(fn)),
        O.getOrElse(() => [] as TopicIndex[]),
      ),
      A.concat(
        pipe(
          O.fromNullable(page.accordions),
          O.map(A.map(fn)),
          O.getOrElse(() => [] as TopicIndex[]),
        ),
      ),
    ),
  )
