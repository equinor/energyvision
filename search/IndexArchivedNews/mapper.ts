import { NewsIndex } from '../common'
import type { SearchMetadataEntry } from './fileStorage'

type MapDataType = (article: SearchMetadataEntry) => NewsIndex
export const mapData: MapDataType = (article) => {
  const {
    publishedDate,
    tags: { topics, country },
    title,
    link,
  } = article
  const year = publishedDate ? new Date(publishedDate).getFullYear() : ''
  return  {
    slug: link,
    objectID: `${publishedDate}-${link}`,
    type: 'news',
    pageTitle: title,
    text: '', // To be added
    publishDateTime: publishedDate,
    topics,
    country,
    year,
  } as NewsIndex
}
