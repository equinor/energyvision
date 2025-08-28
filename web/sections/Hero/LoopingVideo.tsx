'use client'
import { VideoPlayer } from '@/core/VideoJsPlayer/VideoPlayer'
import { ImageWithAlt } from '@/types'

export type LoopingVideoRatio = '1:2' | 'narrow' // Typo in Sanity value, should be 2:1

export type LoopingVideoData = {
  title: string
  poster: ImageWithAlt
  src: string
  ratio: LoopingVideoRatio
  containVideo?: boolean
}
export type LoopingVideoProps = {
  video: LoopingVideoData
}

export const LoopingVideo = ({ video }: LoopingVideoProps) => {
  const { ratio } = video
  const aspect: Record<string, any> = {
    narrow: '10:3',
    tall: '21:9',
    '1:2': '2:1', // Typo in Sanity value, should look through dataset in prod for use and migrate or change to 2:1
  }

  return (
    //@ts-ignore: TODO
    <VideoPlayer variant="fullwidth" aspectRatio={aspect[ratio ?? 'narrow']} {...video} autoPlay muted loop />
  )
}
