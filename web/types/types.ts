// @TODO Don't know yet where to put this or how to structure it
import { SanityImageObject, SanityImageCrop, SanityImageHotspot } from '@sanity/image-url/lib/types/types'
import { PortableTextEntry } from '@sanity/block-content-to-react'
import { TeaserImagePosition } from '@components'

export type ImageWithCaptionData = {
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: ImageWithAlt
}

export type LinkType = 'internalUrl' | 'externalUrl' | 'downloadableFile' | 'downloadableImage'

export type LinkData = {
  type?: LinkType
  id?: string
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
  extension?: string
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

// From https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/field/src/types/portableText/diff/types.ts
export type PortableTextBlock = {
  _key: string
  _type: string
  children: PortableTextChild[]
  markDefs?: { _key: string; _type: string }[]
  style?: string
}

export type PortableTextChild = {
  _key: string
  _type: string
  marks?: string[]
  text?: string
}

export type PageSchema = {
  slug: string
  title: string
  content?: []
  _key: string
  _type: string
}

export type TeaserData = {
  _type: string
  _key: string
  title: string
  text: PortableTextEntry[]
  overline?: string
  image: ImageWithAlt
  action: LinkData
  background: { title: string; value: string }
  imagePosition: TeaserImagePosition
}
