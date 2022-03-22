import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import { NewsArticle } from './sanity'
import { NewsIndex } from '../../common'

type MapDataType = (article: NewsArticle) => NewsIndex[]
export const mapData: MapDataType = (article) => {
  const { publishDateTime } = article
  // Hu hei hvor det går
  const year = publishDateTime ? new Date(publishDateTime).getFullYear() : ''
  return pipe(
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
          publishDateTime: publishDateTime || null,
          year,
        } as NewsIndex),
    ),
  )
}
