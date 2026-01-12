'use client'
import { getPxLgSizes, getTwAspectRatioUtilityOnRatio, ImageRatioKeys } from '@core/SanityImage/SanityImage'
import type { PortableTextBlock } from '@portabletext/types'
import Img from 'next/image'
import { useMemo, type HTMLProps } from 'react'
import envisTwMerge from '../../twMerge'
import { HlsPlayer } from './HlsPlayer'

export type AspectRatioVariants = '16:9' | '9:16' | '2:1' | '10:3' | '4:3' | '21:9'

export type HlsVideoPlayerProps = Omit<HTMLProps<HTMLVideoElement>, 'src' | 'poster'> & {
  src: string
  figureCaption?: string | PortableTextBlock[]
  captionClassName?: string
  /* setting this will sett fluid mode to video player */
  aspectRatio?: AspectRatioVariants | undefined
  /** Ignores aspect ratio to enable fill mode */
  useFillMode?: boolean
  useBrandTheme?: boolean
  /** Sets id on return element for anchors */
  id?: string
  poster?: string
  /** For the aspect ratios that apply object cover, override to contain */
  containVideo?: boolean
  /** Override hls player classnames */
  videoClassName?: string
}

export const getThumbnailRatio = (aspectRatio: string) => {
  switch (aspectRatio) {
    case '9:16':
      return {
        width: 336,
        height: 600,
      }
    case '1:1':
      return {
        width: 600,
        height: 600,
      }
    default:
      //16:9
      return {
        width: 1380,
        height: 777,
      }
  }
}

export const HlsVideoPlayer = ({
  loop = false,
  autoPlay = false,
  title,
  src,
  muted = false,
  playsInline,
  aspectRatio = '16:9',
  poster,
  className = '',
  videoClassName = '',
}: HlsVideoPlayerProps) => {
  const videoOptions = useMemo(() => {
    return {
      muted: muted ? 'muted' : false,
      playsinline: playsInline,
      loop: loop,
      autoPlay: autoPlay,
      preload: autoPlay ? 'auto' : 'none',
      controls: true,
      ...(poster && {
        poster: poster,
      }),
      ...(title && {
        title: title,
      }),
    }
  }, [autoPlay, loop, muted, playsInline, poster, title])

  const ratioUtility = getTwAspectRatioUtilityOnRatio(aspectRatio as ImageRatioKeys)

  return (
    <div className={envisTwMerge(`absolute w-full h-full`, ratioUtility, className)}>
      {src && <HlsPlayer src={src} videoProps={videoOptions} className={videoClassName} />}
      {!src && poster && <Img src={src} alt="" sizes={getPxLgSizes()} />}
    </div>
  )
}

export default HlsVideoPlayer
