import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import { BlobServiceClient } from '@azure/storage-blob'

export type GetProcessEnvType = IO.IO<E.Either<string, string>>

// TODO: Should we move specific types to the place where they are
export type BlobConfiguration = {
  client: BlobServiceClient
  container: string
}

export type BlockChildNode = {
  _key: string
  _type: string
  marks: string[]
  text: string
}

export type BlockNode = {
  _key: string
  _type: string
  children: BlockChildNode[]
  markDefs: string[]
  style: string
}

export type EventIndex = {
  slug: string
  objectID: string
  type: string
  title: string
  ingress: string
  eventDescription: string
  eventDate: string // does it make sense to use iso or utc
}

export type TopicIndex = {
  slug: string
  objectID: string
  type: string
  pageTitle: string
  title: string
  ingress: string
  text: string
}

export type NewsIndex = {
  slug: string
  objectID: string
  type: string
  pageTitle: string
  text: string
  publishDateTime: string
  year: number
  ingress: string
  topicTags: string[]
  countryTags: string[]
  thumbnailUrl: string
  localNewsTag: string
  heroImage: object
}

export type MagazineIndex = {
  slug: string
  objectID: string
  type: string
  pageTitle: string
  title: string
  ingress: string
  text: string
  magazineTags?: string[]
}

export type IndexType = EventIndex | TopicIndex | NewsIndex | MagazineIndex

export type Page = {
  slug: string
  docToClear?: boolean
}

export type TextBlockIndex = {
  objectID: string
  title: string
  ingress: string
  text: string
}

export type AccordionIndex = {
  objectID: string
  title: string
  ingress: string
  text: string
}
