import { Settings } from '@algolia/client-search'

export type NewsIndex = {
  slug: string
  objectID: string
  type: string
  pageTitle: string
  title: string
  ingress: string
}

export const indexSettings: Settings = {
  searchableAttributes: ['title', 'ingress', 'text', 'pageTitle'],
  attributesToSnippet: ['ingress', 'text'],
  attributeForDistinct: 'slug',
  distinct: 1,
  ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
}
