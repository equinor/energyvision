// @TODO Don't know yet where to put this or how to structure it
import { SanityImageObject, SanityImageCrop, SanityImageHotspot } from '@sanity/image-url/lib/types/types'
import { PortableTextEntry } from '@sanity/block-content-to-react'
import { TeaserImagePosition, TeaserImageSize } from '@components'

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
  ariaLabel?: string
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
  heroImage: ImageWithCaptionData
  seoAndSome: {
    documentTitle?: string
    metaDescription?: string
    openGraphImage?: ImageWithAlt
  }
  // @TODO: Better typings here
  content?: []
  id: string
  type: string
}

export type BackgroundColours = 'White' | 'Moss Green' | 'Moss Green Light' | 'Spruce Wood' | 'Mist Blue' | 'Slate Blue'

export type DesignOptions = {
  background: BackgroundColours
  imagePosition?: TeaserImagePosition
  imageSize?: TeaserImageSize
}

export type TextBlockData = {
  type: string
  id: string
  title: string
  overline?: string
  text: PortableTextEntry[]
  ingress: PortableTextEntry[]
  callToActions?: LinkData[]
  designOptions: DesignOptions
}

// This type is deprecated
export type CallToActionData = {
  type: string
  id: string
  action: LinkData
}

export type TeaserData = {
  type: string
  id: string
  title: string
  text: PortableTextEntry[]
  overline?: string
  image: ImageWithAlt
  action: LinkData
  designOptions: DesignOptions
}

export type FullWidthImageData = {
  type: string
  id: string
  image: ImageWithAlt
}

export type FigureData = {
  type: string
  id: string
  figure: ImageWithCaptionData
  designOptions: DesignOptions
}

export type TextWithIconItem = {
  id: string
  icon: ImageWithAlt
  text: PortableTextEntry[]
  title: string
}

export type TextWithIconArrayData = {
  type: string
  id: string
  group: TextWithIconItem[]
  designOptions: DesignOptions
}

export type QuoteData = {
  type: string
  id: string
  author: string
  authorTitle: string
  quote: string
  image: ImageWithAlt
  designOptions: DesignOptions
}

export type AccordionListData = {
  id: string
  title: string
  content: PortableTextEntry[]
}

export type AccordionData = {
  type: string
  id: string
  title: string
  ingress: PortableTextEntry[]
  accordion: AccordionListData[]
  designOptions: DesignOptions
}

export type PromoTileData = {
  id: string
  title: string
  image: ImageWithAlt
  action: LinkData
  designOptions: DesignOptions
}

export type PromoTileArrayData = {
  type: string
  id: string
  group: PromoTileData[]
}
