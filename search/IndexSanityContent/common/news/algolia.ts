import { Settings } from '@algolia/client-search'

export const indexSettings: Settings = {
  searchableAttributes: ['pageTitle', 'text', 'ingress'],
  attributesToSnippet: ['text', 'ingress'],
  attributesForFaceting: ['year', 'topicTags', 'countryTags', 'localNewsTag', 'type', 'slug'],
  attributeForDistinct: 'slug',
  distinct: 1,
  advancedSyntax: true,
  ranking: ['desc(publishDateTime)', 'typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
}
