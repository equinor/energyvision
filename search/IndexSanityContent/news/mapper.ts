import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import { NewsArticle } from './sanity'
import { NewsIndex } from './algolia'

type MapDataType = (article: NewsArticle) => NewsIndex[]
export const mapData: MapDataType = (article) =>
  pipe(
    A.bindTo('blocks')(article.blocks),
    A.bind('children', ({ blocks }) => blocks.children),
    A.map(
      ({ blocks, children }) =>
        ({
          slug: article.slug,
          objectID: `${article._id}-${blocks.blockKey}-${children.childKey}`,
          type: 'news',
          pageTitle: article.title,
          text: children.text,
        } as NewsIndex),
    ),
  )
