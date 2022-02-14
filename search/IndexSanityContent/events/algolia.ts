import { Settings } from '@algolia/client-search'

export type EventIndex = {
  slug: string
  objectID: string
  type: string
  title: string
  ingress: string
  eventDescription: string
  eventDate: string // does it make sense to use iso or utc
}

export const indexSettings: Settings = {
  searchableAttributes: ['title', 'ingress', 'eventDescription'], // date should not be searchable?
  attributesToSnippet: ['ingress', 'eventDescription'], // I don't know if this is relevant with the hooks lib?
  attributeForDistinct: 'slug',
  distinct: 1,
}
