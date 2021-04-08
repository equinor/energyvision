// @TODO Don't know yet where to put this or how to structure it
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { PortableTextEntry } from '@sanity/block-content-to-react'

export type ImageWithCaptionData = {
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  alt: string
  image: { _type: 'imageWithAlt'; alt: string; asset: SanityImageObject }
}

export type LinkData = {
  type: string
  id: string
  label: string
  link?: { slug: string; type: string }
  href?: string
}

export type RelatedLinksData = {
  title: string
  links: LinkData[]
}

export type NewsCard = {
  slug: string
  title: string
  id: string
  publishDateTime: string
  heroImage: { _type: string; alt: string; image: SanityImageObject; caption?: string; attribution?: string }
  ingress: PortableTextEntry[]
}

export type NewsSchema = {
  slug: string
  title: string
  id: string
  publishDateTime: string
  heroImage: ImageWithCaptionData
  ingress: PortableTextEntry[]
  content: PortableTextEntry[]
  relatedLinks: RelatedLinksData
}
