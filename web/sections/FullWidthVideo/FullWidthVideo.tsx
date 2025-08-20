'use client'
import { VideoPlayer } from '@/core/VideoJsPlayer/VideoPlayer';
import { FullWidthVideoData } from '../../types/index'

const FullWidthVideo = ({ anchor, data }: { data: FullWidthVideoData; anchor?: string }) => {
  const { video, designOptions, spacing } = data
  const { aspectRatio } = designOptions

  const aspect = {
    'narrow': '10:3',
    'fullScreen': '16:9',
    '2:1': '2:1'
  }

  return (
        <VideoPlayer
          id={anchor}
          variant='fullwidth'
          aspectRatio={aspect[aspectRatio] ?? '16:9'}
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
