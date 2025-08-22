'use client'
import { AspectRatioVariants, VideoPlayer } from '@/core/VideoJsPlayer/VideoPlayer'
import { FullWidthVideoData } from '../../types/index'

const FullWidthVideo = ({ anchor, data }: { data: FullWidthVideoData; anchor?: string }) => {
  const { video, designOptions } = data
  const { aspectRatio } = designOptions

  const aspect: Record<string, AspectRatioVariants> = {
    narrow: '10:3',
    fullScreen: '16:9',
    '2:1': '2:1',
  }

  return (
    <VideoPlayer
      id={anchor}
      variant="fullwidth"
      aspectRatio={aspect[aspectRatio] ?? aspect['fullScreen']}
      title={video.title}
      autoPlay
      muted
      loop
      src={video.url}
      playsInline
    />
  )
}

export default FullWidthVideo
