'use client'
import { VideoPlayer } from '@/core/VideoJsPlayer/VideoPlayer'
import { useSanityLoader } from '@/lib/hooks/useSanityLoader'
import { LoopingVideoData } from '@/types'

const DEFAULT_MAX_WIDTH = 1920

export const LoopingVideo = ({ video }: { video: LoopingVideoData }) => {
  const { ratio } = video
  const aspect: Record<string, any> = {
    narrow: '10:3',
    tall: '21:9',
  }

  return <VideoPlayer variant="fullwidth" aspectRatio={aspect[ratio ?? 'narrow']} {...video} autoPlay muted loop />

  /*   return (
    <div className={`relative ${ratio == 'narrow' ? 'pb-[75%] md:pb-[30%]' : 'pb-[50%]'}`}>
      <figure className="absolute m-0 flex h-full w-full justify-center">
        <VideoPlayer
          className="absolute h-full w-full object-cover"
          loop
          muted
          autoPlay
          playButton={false}
          title={title}
          poster={thumbnailURL?.src}
          src={url}
          videoDescription={thumbnail.alt}
        />
      </figure>
    </div>
  ) */
}
