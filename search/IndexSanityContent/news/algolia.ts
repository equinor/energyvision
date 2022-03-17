import { Settings } from '@algolia/client-search'

export type NewsIndex = {
  slug: string
  objectID: string
  type: string
  pageTitle: string
  text: string
  publishDateTime: string
}

export const indexSettings: Settings = {
  searchableAttributes: ['pageTitle', 'text'],
  attributesToSnippet: ['text'],
  attributeForDistinct: 'slug',
  distinct: 1,
  ranking: ['desc(publishDateTime)', 'typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
}
