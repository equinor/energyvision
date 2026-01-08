import type { PortableTextBlock } from '@portabletext/types'
import type {
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageObject,
} from '@sanity/image-url'
import type { ContentAlignmentTypes, DesignOptions, LinkData } from './index'

export type CaptionData = {
  attribution?: string
  caption?: string
}

export type ImageWithAlt = {
  isDecorative: boolean
  alt?: string
  asset: SanityImageObject
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  _type: 'imageWithAlt'
  extension?: string
  useLight?: boolean
}

export type ImageWithCaptionData = {
  _type: 'imageWithAltAndCaption'
  type: 'imageWithAltAndCaption'
  _key?: string
  image: ImageWithAlt
  asset: SanityImageObject
} & CaptionData

export type ImageBackground = {
  image: ImageWithAlt | SanityImageObject
  useAnimation?: boolean
  useLight?: boolean
  contentAlignment?: ContentAlignmentTypes
}

export type ImageWithLinkOrOverlay = {
  id: string
  type: 'imageWithLinkOrOverlay'
  image: SanityImageObject
  action?: LinkData
  captionTitle?: PortableTextBlock[]
  captionText?: PortableTextBlock[]
}

export type ImageCarouselItem = ImageWithCaptionData | ImageWithLinkOrOverlay

export type ImageCarouselData = {
  type: 'imageCarousel'
  id: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  hideTitle?: boolean
  items: ImageCarouselItem[]
  options: {
    autoplay?: boolean
    delay?: number
  }
  designOptions: DesignOptions
}
