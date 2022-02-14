import { Settings } from '@algolia/client-search'

export type EventIndex = {
  slug: string
  objectID: string
  type: string
  title: string
  ingress: string
  eventDate: string // does it make sense to use iso or utc
}

export const indexSettings: Settings = {
  searchableAttributes: ['title', 'ingress'], // date should not be searchable?
  attributesToSnippet: ['ingress'],
  attributeForDistinct: 'slug',
  distinct: 1,
}
