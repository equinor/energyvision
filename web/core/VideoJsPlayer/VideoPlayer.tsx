'use client'
import { HTMLProps } from 'react'
import { AspectRatioVariants, Video } from './Video'
import Player from 'video.js/dist/types/player'
import { PortableTextBlock } from 'next-sanity'
import { twMerge } from 'tailwind-merge'
import Blocks from '@/portableText/Blocks'
import 'video.js/dist/video-js.css'
import { ImageWithAlt } from '@/types'
import { useSanityLoader } from '@/lib/hooks/useSanityLoader'
import { mapSanityImageRatio, MAX_WIDTH_LAYOUT_MD } from '../SanityImage/SanityImage'

export type VideoType = {
  title: string
  src: string
  thumposterbnail: ImageWithAlt
}

export type VideoControlsType = {
  playButton?: boolean
  controls?: boolean
  loop?: boolean
  allowFullScreen?: boolean
  autoPlay?: boolean
  muted?: boolean
}

type Variants = 'default' | 'fullwidth'

type VideoPlayerProps = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  variant?: Variants
  src: string
  playButton?: boolean
  figureCaption?: string | PortableTextBlock[]
  captionClassName?: string
  /* setting this will sett fluid mode to video player */
  aspectRatio?: AspectRatioVariants | undefined
  /** Ignores aspect ratio to enable fill mode */
  useFillMode?: boolean
  useBrandTheme?: boolean
  /** Sets id on return element for anchors */
  id?: string
  poster?: ImageWithAlt
}
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  variant = 'default',
  id,
  loop,
  figureCaption,
  captionClassName = '',
  playButton,
  autoPlay,
  title,
  src,
  muted,
  playsInline,
  aspectRatio = '16:9',
  useBrandTheme = false,
  useFillMode = false,
  poster,
  allowFullScreen,
  className,
}) => {
  //@ts-ignore: Look into our hooks and undefined params: Type 'undefined' is not assignable to type 'ImageWithAlt | SanityImageObject'. <- poster
  const posterProps = useSanityLoader(poster, MAX_WIDTH_LAYOUT_MD, mapSanityImageRatio(aspectRatio))
  //const playerRef = useRef<Player>(null)
  const useFill = useFillMode || aspectRatio === '10:3' || aspectRatio === '21:9'

  const videoJsOptions = {
    src: [
      {
        src: src,
        type: 'application/x-mpegURL',
      },
    ],
    muted: muted ? 'muted' : false,
    playsinline: playsInline,
    loop: loop,
    autoplay: autoPlay,
    preload: autoPlay ? 'auto' : 'none',
    controls: true,
    responsive: true,
    ...(useFill
      ? { fill: true }
      : {
          fluid: true,
          aspectRatio,
        }),
    bigPlayButton: playButton && !autoPlay,
    controlbar: true,
    audioTrack: false,
    loadingSpinner: true,
    controlBar: {
      pictureInPictureToggle: false,
      pictureInPictureControl: false,
      chaptersButton: false,
      audioTrackButton: false,
      playbackRateMenuButton: false,
      fullscreenToggle: variant !== 'fullwidth' ? allowFullScreen : false,
      ...(variant === 'fullwidth' && {
        progressControl: {
          seekBar: false,
        },
        captionsButton: false,
        subtitlesButton: false,
        remainingTimeDisplay: false,
        volumePanel: false,
      }),
    },
    html5: {
      useDevicePixelRatio: true,
      limitRenditionByPlayerDimensions: false,
      hls: {
        useDevicePixelRatio: true,
        limitRenditionByPlayerDimensions: false,
      },
    },
    ...(poster &&
      posterProps?.src && {
        poster: posterProps?.src,
      }),
    ...(title && {
      title: title,
    }),
  }

  const aspectRatioClassName: Record<AspectRatioVariants, string> = {
    '10:3': 'aspect-10/3',
    '9:16': 'aspect-9/16',
    '16:9': 'aspect-video',
    '2:1': 'aspect-2/1',
    '4:3': 'aspect-4/3',
    '21:9': 'aspect-21/9',
  }

  const variantClassName: Record<Variants, string> = {
    default: `w-full`,
    fullwidth: `w-screen`,
  }

  const handlePlayerReady = (player: Player) => {
    //playerRef.current = player
    // analytics here?
    console.log('player is ready')
  }
  console.log('Player wrapper  variant', variant)
  //console.log('aspectRatio', aspectRatio)

  console.log('Player wrapper useFill', useFill)

  return (
    <figure
      {...(id && { id })}
      className={twMerge(`relative ${variantClassName[variant]} ${aspectRatioClassName[aspectRatio]}`, className)}
    >
      <Video options={videoJsOptions} onReady={handlePlayerReady} useBrandTheme={useBrandTheme} />
      {figureCaption && (
        <figcaption className={twMerge(`text-md ${title ? 'py-2' : ''}`, captionClassName)}>
          {figureCaption && Array.isArray(figureCaption) && <Blocks value={figureCaption} />}
          {figureCaption && !Array.isArray(figureCaption) && figureCaption}
        </figcaption>
      )}
    </figure>
  )
}
