import { Settings } from '@algolia/client-search'

export const indexSettings: Settings = {
  searchableAttributes: ['title', 'ingress', 'eventDescription'], // date should not be searchable?
  attributesToSnippet: ['ingress', 'eventDescription'], // 10 words are default. eventDescription:30 for 30 words
  attributeForDistinct: 'slug',
  attributesForFaceting: ['slug'],
  distinct: 1,
  // This is the default ranking. Does it make sense to sort on date somehow? I think we need to
  // convert it to an iso date in that case
  ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
}
