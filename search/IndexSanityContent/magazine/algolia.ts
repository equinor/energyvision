import { Settings } from '@algolia/client-search'

export const indexSettings: Settings = {
  searchableAttributes: ['pageTitle', 'title', 'ingress', 'text'],
  attributesToSnippet: ['ingress', 'text'],
  attributesForFaceting: ['magazineTags', 'slug'],
  attributeForDistinct: 'slug',
  distinct: 1,
  advancedSyntax: true,
  ranking: ['desc(publishDateTime)', 'typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
}
