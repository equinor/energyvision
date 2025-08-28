'use client'
import { VideoPlayer, VideoType } from '@/core/VideoJsPlayer/VideoPlayer'
import { DesignOptions, LinkData } from '../../types/index'
import { PortableTextBlock } from 'next-sanity'
import { AspectRatioVariants } from '@/core/VideoJsPlayer/Video'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

export type FullWidthVideoRatio = 'fullScreen' | 'narrow' | '2:1'

export type FullWidthVideoProps = {
  type: string
  id: string
  video: VideoType
  title?: PortableTextBlock[]
  action?: LinkData
  designOptions: DesignOptions & {
    containVideo?: boolean
    aspectRatio: FullWidthVideoRatio
  }
  anchor?: string
}

const FullWidthVideo = ({ anchor, video, designOptions }: FullWidthVideoProps) => {
  const { aspectRatio = 'fullScreen', containVideo } = designOptions
  const aspect: Record<string, AspectRatioVariants> = {
    narrow: '10:3',
    fullScreen: '21:9',
    '2:1': '2:1',
  }

  return (
    //@ts-ignore: TODO
    <VideoPlayer
      id={anchor}
      variant="fullwidth"
      containVideo={containVideo}
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
