'use client'
import { ImageWithAlt } from '../../types'
import HlsVideoPlayer, { getThumbnailRatio } from '@core/HlsVideoPlayer/HlsVideoPlayer'
import { urlFor } from '../../common/helpers'

export type LoopingVideoRatio = '1:2' | 'narrow'

export type LoopingVideoData = {
  title: string
  thumbnail: ImageWithAlt
  url: string
  ratio: LoopingVideoRatio
}

export const LoopingVideo = ({ video }: { video: LoopingVideoData }) => {
  const { title, url, thumbnail, ratio } = video

  const { width: w, height: h } = getThumbnailRatio(ratio)
  const posterUrl = thumbnail?.asset ? urlFor(thumbnail?.asset).width(w).height(h)?.url() : undefined

  return (
    <div className={`relative ${ratio === 'narrow' ? 'pb-[75%] md:pb-[30%]' : 'pb-[50%]'}`}>
      <HlsVideoPlayer
        //@ts-ignore:todo
        aspectRatio={ratio}
        src={url}
        autoPlay
        loop
        muted
        poster={posterUrl}
        title={title}
      />
    </div>
  )
}
