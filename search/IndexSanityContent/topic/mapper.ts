import { TopicPage } from './sanity'
import { TopicIndex } from './algolia'

type MapDataType = (page: TopicPage) => TopicIndex[]
export const mapData: MapDataType = (page) =>
  page.textBlocks?.map(({ _key, title, ingress, text }) => ({
    slug: page.slug,
    objectID: `${page._id}- ${_key}`,
    type: 'page',
    title,
    ingress,
    text,
  }))
