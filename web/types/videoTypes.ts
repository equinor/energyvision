import { ImageWithAlt, DesignOptions, LinkData } from './index'
import { PortableTextBlock } from '@portabletext/types'

export enum VideoPlayerRatios {
  '16:9' = '16:9',
  '9:16' = '9:16',
  '1:1' = '1:1',
}

export type VideoType = {
  title: string
  url: string
  thumbnail: ImageWithAlt
}

export type VideoControlsType = {
  playButton?: boolean
  controls?: boolean
  loop?: boolean
  allowFullScreen?: boolean
  autoPlay?: boolean
  muted?: boolean
}

export type VideoDesignOptionsType = {
  aspectRatio: VideoPlayerRatios
  height?: number
  width?: 'normal' | 'extraWide'
  useBrandTheme?: boolean
}

export type VideoPlayerData = {
  id: string
  type: string
  video: VideoType
  videoControls: VideoControlsType
  designOptions: DesignOptions & VideoDesignOptionsType
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  action?: LinkData
  transcript?: PortableTextBlock[]
}

export type VideoPlayerCarouselItem = {
  id: string
  video: VideoType
  title?: PortableTextBlock[]
  hideVideoTitle?: boolean
  aspectRatio?: VideoPlayerRatios
}

export type VideoPlayerCarouselData = {
  id: string
  type: string
  items: VideoPlayerCarouselItem[]
  designOptions: DesignOptions & {
    aspectRatio: VideoPlayerRatios
  }
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
}

export type LoopingVideoRatio = '1:2' | 'narrow'

export type LoopingVideoData = {
  title: string
  thumbnail: ImageWithAlt
  url: string
  ratio: LoopingVideoRatio
}

export type FullWidthVideoData = {
  type: string
  id: string
  video: {
    title: string
    url: string
    thumbnail: ImageWithAlt
  }
  spacing?: boolean
  title?: PortableTextBlock[]
  action?: LinkData
  designOptions: DesignOptions & {
    aspectRatio: FullWidthVideoRatio
  }
}

export type FullWidthVideoRatio = 'fullScreen' | 'narrow' | '2:1'
