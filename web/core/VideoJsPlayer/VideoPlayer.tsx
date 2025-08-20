'use client'
import { HTMLProps, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Video } from './Video'
import Player from 'video.js/dist/types/player'
import { PortableTextBlock } from 'next-sanity'
import { twMerge } from 'tailwind-merge'
import Blocks from '@/portableText/Blocks'
import 'video.js/dist/video-js.css'

const DynamicVideoPlayer = dynamic<React.ComponentProps<typeof Video>>(
  () => import('./Video').then((mod) => mod.Video),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)
type Variants = 'default' | 'fullwidth'
type AspectRatioVariants = '16:9' | '9:16' | '2:1' | '10:3'

type VideoPlayerProps = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  variant?: Variants
  src: string
  playButton?: boolean
  figureCaption?: string | PortableTextBlock[]
  captionClassName?: string
  /* setting this will sett fluid mode to video player */
  aspectRatio?: AspectRatioVariants
  /** Ignores aspect ratio to enable fill mode */
  useFillMode?: boolean
  useBrandTheme?: boolean
  /** Sets id on return element for anchors */
  id?: string
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
  const playerRef = useRef<Player>(null)

  const useFill = useFillMode || aspectRatio === '10:3'

  const videoJsOptions = {
    sources: [
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
    loadingSpinner: !autoPlay,
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
  }

  const aspectRatioClassName: Record<AspectRatioVariants, string> = {
    '10:3': 'aspect-4/3 lg:aspect-10/3',
    '9:16': 'lg:aspect-9/16',
    '16:9': 'aspect-4/3 lg:aspect-video',
    '2:1': 'aspect-2/1',
  }

  const variantClassName: Record<Variants, string> = {
    default: `w-full`,
    fullwidth: `w-screen object-cover`,
  }

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player

    player.on('waiting', () => {
      console.log('Player is waiting')
    })

    player.on('dispose', () => {
      console.log('Player will dispose')
    })
  }

  return (
    <figure
      {...(id && { id })}
      className={twMerge(`relative ${variantClassName[variant]} ${aspectRatioClassName[aspectRatio]}`, className)}
    >
      <DynamicVideoPlayer
        options={videoJsOptions}
        onReady={handlePlayerReady}
        useBrandTheme={useBrandTheme}
        poster={poster}
      />
      {figureCaption && (
        <figcaption className={twMerge(`text-md ${title ? 'py-2' : ''}`, captionClassName)}>
          {figureCaption && Array.isArray(figureCaption) && <Blocks value={figureCaption} />}
          {figureCaption && !Array.isArray(figureCaption) && figureCaption}
        </figcaption>
      )}
    </figure>
  )
}
