import { NewsIndex } from '../common'
import type { SearchMetadataEntry } from './fileStorage'
import { identity } from 'fp-ts/function'

type MapDataType = (article: SearchMetadataEntry) => NewsIndex
export const mapData: MapDataType = (article) => {
  const {
    publishedDate,
    tags: { topics, country },
    title,
    category,
    description,
    link,
    content,
    thumbnailURL,
  } = article
  const year = publishedDate ? new Date(publishedDate).getFullYear() : ''
  return {
    slug: link,
    objectID: `${publishedDate}-${link}`,
    type: 'news',
    pageTitle: title,
    ingress: description,
    text: content,
    publishDateTime: publishedDate,
    topicTags: [
      ...new Set(
        [...topics, ...category.split(',')]
          .map((s) => s.trim())
          .filter(identity)
          .filter((s) => s !== country.trim()),
      ),
    ],
    countryTags: [country.trim()].filter(identity),
    year,
    thumbnailUrl: thumbnailURL,
  } as NewsIndex
}
