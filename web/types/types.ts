// @TODO Don't know yet where to put this or how to structure it
import { SanityImageObject } from '@sanity/image-url/lib/types/types'

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
