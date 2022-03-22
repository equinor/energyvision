import { Settings } from '@algolia/client-search'

export const indexSettings: Settings = {
  searchableAttributes: ['pageTitle', 'text'],
  attributesToSnippet: ['text'],
  attributesForFaceting: ['year', 'tags', 'countryTags'],
  attributeForDistinct: 'slug',
  distinct: 1,
  ranking: ['desc(publishDateTime)', 'typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
}
