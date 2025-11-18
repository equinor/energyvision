'use client'
import { HTMLProps, useRef } from 'react'
import { AspectRatioVariants, Variants, Video } from './Video'
import Player from 'video.js/dist/types/player'
import { PortableTextBlock } from 'next-sanity'
import { twMerge } from 'tailwind-merge'
import Blocks from '@/portableText/Blocks'
import 'video.js/dist/video-js.css'
import { ImageWithAlt } from '@/types'
import { resolveImage } from '@/sanity/lib/utils'
import { mapSanityImageRatio } from '../Image/Image'

export type VideoType = {
  title: string
  src: string
  poster: ImageWithAlt
}

export type VideoControlsType = {
  loop?: boolean
  autoPlay?: boolean
  muted?: boolean
}

export type VideoPlayerProps = Omit<HTMLProps<HTMLVideoElement>, 'src' | 'poster'> & {
  variant?: Variants
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
  poster?: ImageWithAlt
  /** For the aspect ratios that apply object cover, override to contain */
  containVideo?: boolean
}
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  variant = 'default',
  id,
  loop = false,
  figureCaption,
  captionClassName = '',
  autoPlay = false,
  title,
  src,
  muted = false,
  playsInline,
  aspectRatio = '16:9',
  useBrandTheme = false,
  useFillMode = false,
  poster,
  className,
  containVideo,
}) => {
  const { url: posterUrl } = resolveImage({
    image: poster,
    grid: 'lg',
    aspectRatio: mapSanityImageRatio(aspectRatio === '9:16' ? '9:16' : '16:9'),
  })
  const playerRef = useRef<Player>(null)
  const useFill = !containVideo && (useFillMode || aspectRatio === '10:3' || aspectRatio === '21:9')

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
    disablePictureInPicture: true,
    ...(useFill
      ? { fill: true }
      : {
          fluid: true,
          aspectRatio,
        }),
    bigPlayButton: !autoPlay,
    controlbar: true,
    audioTrack: false,
    loadingSpinner: true,
    controlBar: {
      pictureInPictureToggle: false,
      pictureInPictureControl: false,
      chaptersButton: false,
      audioTrackButton: false,
      playbackRateMenuButton: false,
      fullscreenToggle: variant !== 'fullwidth' ? true : false,
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
      posterUrl && {
        poster: posterUrl,
      }),
    ...(title && {
      title: title,
    }),
  }

  const aspectRatioClassName: Record<AspectRatioVariants, string> = {
    '10:3': 'aspect-16/9 md:aspect-10/3',
    '16:9': 'aspect-video',
    '21:9': 'aspect-16/9 md: aspect-21/9',
    '9:16': 'aspect-9/16',
    '2:1': 'aspect-2/1',
    '4:3': 'aspect-4/3',
  }

  const variantClassName: Record<Variants, string> = {
    default: `w-full`,
    fullwidth: `w-screen`,
  }

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player
    // analytics here?
    console.log('player is ready')
    // You can handle player events here, for example:
    player.on('waiting', () => {
      console.log('player is waiting')
    })
  }

  return (
    <figure {...(id && { id })} className={twMerge(`relative flex flex-col ${variantClassName[variant]}`, className)}>
      <div className={`${aspectRatioClassName[aspectRatio]}`}>
        <Video
          //@ts-ignore: TODO
          options={videoJsOptions}
          onReady={handlePlayerReady}
          useBrandTheme={useBrandTheme}
          containVideo={containVideo}
          variant={variant}
        />
      </div>
      {figureCaption && (
        <figcaption className={twMerge(`w-full text-md ${title ? 'py-2' : ''} `, captionClassName)}>
          {figureCaption && Array.isArray(figureCaption) && <Blocks value={figureCaption} />}
          {figureCaption && !Array.isArray(figureCaption) && figureCaption}
        </figcaption>
      )}
    </figure>
  )
}
