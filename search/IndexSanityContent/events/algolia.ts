import { Settings } from '@algolia/client-search'

export type EventIndex = {
  slug: string,
  objectID: string,
  type: string,
  title: string,
  ingress: string
}

export const indexSettings: Settings = {
  searchableAttributes: ['title', 'ingress'],
  attributesToSnippet: ['ingress'],
  attributeForDistinct: 'slug',
  distinct: 1,
}
