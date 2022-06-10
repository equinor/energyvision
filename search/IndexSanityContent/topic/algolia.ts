import { Settings } from '@algolia/client-search'


export const indexSettings: Settings = {
  searchableAttributes: ['pageTitle', 'title', 'ingress', 'text'],
  attributesToSnippet: ['ingress', 'text'],
  attributeForDistinct: 'slug',
  distinct: 1,
  advancedSyntax: true,
  ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
}
