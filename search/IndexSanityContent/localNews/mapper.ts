import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import { NewsIndex } from '../../common'
import type { LocalNewsArticle } from './sanity'

type MapDataType = (article: LocalNewsArticle) => NewsIndex[]
export const mapData: MapDataType = (article) => {
  const { publishDateTime, localNewsTag, title, ingress, slug, factboxes } = article
  // Hu hei hvor det går
  const year = publishDateTime ? new Date(publishDateTime).getFullYear() : ''
  return pipe(
    A.bindTo('blocks')(article.blocks),
    A.bind('children', ({ blocks }) => blocks.children),
    A.map(
      ({ blocks, children }) =>
        ({
          slug,
          objectID: `${article._id}-${blocks.blockKey}-${children.childKey}`,
          type: 'localNews',
          pageTitle: title,
          ingress,
          text: children.text,
          publishDateTime: publishDateTime,
          localNewsTag,
          year,
        } as NewsIndex),
    ),
    A.concat(
      factboxes.map(
        (factbox) =>
          ({
            slug,
            objectID: `${article._id}-${factbox.blockKey}`,
            type: 'localNews',
            pageTitle: title,
            ingress,
            text: factbox.title + ': ' + factbox.text,
            publishDateTime: publishDateTime,
            localNewsTag,
            year,
          } as NewsIndex),
      ),
    ),
  )
}
