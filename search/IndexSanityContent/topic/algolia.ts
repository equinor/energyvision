import { Settings } from '@algolia/client-search'

export type TopicIndex = {
  slug: string
  objectID: string
  type: string
  pageTitle: string
  title: string
  ingress: string
  text: string
}

export const indexSettings: Settings = {
  searchableAttributes: ['title', 'ingress', 'text'],
  attributesToSnippet: ['ingress'],
  attributeForDistinct: 'slug',
  distinct: 1,
  ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
}
