'use client'
import { VideoPlayer, VideoType } from '@/core/VideoJsPlayer/VideoPlayer'
import { DesignOptions, LinkData } from '../../types/index'
import { PortableTextBlock } from 'next-sanity'
import { AspectRatioVariants } from '@/core/VideoJsPlayer/Video'

export type FullWidthVideoRatio = 'fullScreen' | 'narrow' | '2:1'

export type FullWidthVideoProps = {
  type: string
  id: string
  video: VideoType
  title?: PortableTextBlock[]
  action?: LinkData
  designOptions: DesignOptions & {
    aspectRatio: FullWidthVideoRatio
  }
  anchor?: string
}

const FullWidthVideo = ({ anchor, video, designOptions }: FullWidthVideoProps) => {
  const { aspectRatio = 'fullScreen' } = designOptions
  const aspect: Record<string, AspectRatioVariants> = {
    narrow: '10:3',
    fullScreen: '16:9',
    '2:1': '2:1',
  }

  return (
    <VideoPlayer
      id={anchor}
      variant="fullwidth"
      aspectRatio={aspect[aspectRatio ?? 'fullScreen']}
      {...video}
      autoPlay
      muted
      loop
      playsInline
    />
  )
}

export default FullWidthVideo
