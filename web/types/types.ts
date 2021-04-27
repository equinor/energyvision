// @TODO Don't know yet where to put this or how to structure it
import { SanityImageObject, SanityImageCrop, SanityImageHotspot } from '@sanity/image-url/lib/types/types'
import { PortableTextEntry } from '@sanity/block-content-to-react'

export type ImageWithCaptionData = {
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: ImageWithAlt
}

export type LinkType = 'internalUrl' | 'externalUrl' | 'downloadableFile'

export type LinkData = {
  type: LinkType
  id: string
  label: string
  link?: { slug: string; type: string }
  href?: string
  extension?: string
}

export type RelatedLinksData = {
  title: string
  links: LinkData[]
}

export type ImageWithAlt = {
  alt: string
  asset: SanityImageObject
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  _type: 'imageWithAlt'
}

export type NewsCardData = {
  slug: string
  title: string
  id: string
  publishDateTime: string
  heroImage: ImageWithCaptionData
  ingress: PortableTextEntry[]
}

export type NewsSchema = {
  slug: string
  title: string
  documentTitle?: string
  metaDescription?: string
  openGraphImage?: ImageWithAlt
  id: string
  updatedAt: string
  publishDateTime: string
  heroImage: ImageWithCaptionData
  ingress: PortableTextEntry[]
  content: PortableTextEntry[]
  relatedLinks: RelatedLinksData
}
