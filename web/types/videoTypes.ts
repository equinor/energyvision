import { VideoPlayerRatios, VideoType } from '@/core/VideoJsPlayer/VideoPlayer'
import { ImageWithAlt, DesignOptions, LinkData } from './index'
import { PortableTextBlock } from '@portabletext/types'

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
  scrollMode?: boolean
  title?: PortableTextBlock[]
  hideTitle?: boolean
  ingress?: PortableTextBlock[]
}

export type LoopingVideoRatio = '1:2' | 'narrow'

export type LoopingVideoData = {
  title: string
  poster: ImageWithAlt
  src: string
  ratio: LoopingVideoRatio
}
