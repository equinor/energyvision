import { ContentAlignmentTypes, FigureRatio, DesignOptions, LinkData } from './index'
import { SanityImageCrop, SanityImageHotspot, SanityImageObject } from '@sanity/image-url/lib/types/types'
import { PortableTextBlock } from '@portabletext/types'

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

export type FullWidthImageData = {
  type: string
  id: string
  image: ImageWithCaptionData
  designOptions: DesignOptions & {
    aspectRatio: number
  }
}

export type FigureData = {
  type: string
  id: string
  figure: ImageWithCaptionData
  designOptions: DesignOptions & {
    aspectRatio?: FigureRatio
  }
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
  captionPositionUnderImage?: boolean
  options: {
    singleMode?: boolean
    autoplay?: boolean
    delay?: number
  }
  designOptions: DesignOptions
}
