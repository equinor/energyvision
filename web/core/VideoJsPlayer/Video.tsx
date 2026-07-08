'use client'
import { type HTMLProps, useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import type Player from 'video.js/dist/types/player'
import useVideojsAnalytics from './useVideojsAnalytics'

//Needed?
export enum VideoPlayerRatios {
  '16:9' = '16:9',
  '9:16' = '9:16',
  '1:1' = '1:1',
  '4:3' = '4:3',
}

export type AspectRatioVariants =
  | '16:9'
  | '9:16'
  | '2:1'
  | '10:3'
  | '4:3'
  | '21:9'
  | '1:1'

export type Variants = 'default' | 'fullwidth'

type VideoOptions = {
  playButton?: boolean
  autoplay?: boolean
  fill?: boolean
  aspectRatio: AspectRatioVariants
  src: string
} & Omit<HTMLProps<HTMLVideoElement>, 'src'>

type VideoProps = {
  variant?: Variants
  options: VideoOptions
  useBrandTheme?: boolean
  /** For the aspect ratios that apply object cover, override to contain */
  containVideo?: boolean
  onReady?: (player: Player) => void
} & Omit<HTMLProps<HTMLVideoElement>, 'src'>

export const Video: React.FC<VideoProps> = ({
  variant = 'default',
  options,
  onReady,
  useBrandTheme = false,
  containVideo = false,
}) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player>(null)
  const videoElementRef = useRef<HTMLElement | null>(null)
  const onReadyRef = useRef<VideoProps['onReady']>(onReady)
  const sourceKeyRef = useRef('')
  const [isReady, setIsReady] = useState(false)
  const { src, title, autoplay = false, fill, aspectRatio } = options

  const getSourceKey = (source: unknown): string => {
    if (typeof source === 'string') {
      return source
    }

    if (Array.isArray(source)) {
      return source
        .map(item => {
          if (typeof item === 'string') {
            return item
          }

          if (item && typeof item === 'object') {
            const value = item as { src?: string; type?: string }
            return `${value.src ?? ''}|${value.type ?? ''}`
          }

          return ''
        })
        .join(';')
    }

    if (source && typeof source === 'object') {
      const value = source as { src?: string; type?: string }
      return `${value.src ?? ''}|${value.type ?? ''}`
    }

    return ''
  }

  const sourceKey = getSourceKey(src)

  useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  //Here or in the VideoPlayer?
  useVideojsAnalytics(playerRef.current, src, title, autoplay)

  useEffect(() => {
    if (playerRef.current) {
      return
    }

    const videoElement = document.createElement('video-js')
    videoElementRef.current = videoElement
    videoElement.classList.add('vjs-layout-large')
    if (useBrandTheme) {
      videoElement.classList.add('vjs-envis-brand')
    }
    if (variant === 'fullwidth') {
      videoElement.classList.add('vjs-fullwidth')
    }
    if (
      !containVideo &&
      (fill || aspectRatio === '10:3' || aspectRatio === '21:9')
    ) {
      videoElement.classList.add('vjs-fill', 'lg:[&>video]:object-cover')
    }
    if (aspectRatio === '16:9') {
      videoElement.classList.add('vjs-16-9')
    }
    if (aspectRatio === '4:3') {
      videoElement.classList.add('vjs-4-3')
    }
    if (aspectRatio === '9:16') {
      videoElement.classList.add('vjs-9-16')
    }

    videoRef.current?.appendChild(videoElement)
    setIsReady(false)

    const markReady = () => {
      setIsReady(true)
      videoElement.classList.add('vjs-ready')
    }

    const readyTimeout = window.setTimeout(markReady, 350)

    const player = videojs(videoElement, options, () => {
      videoElement.classList.remove('vjs-custom-waiting')
      player.autoplay(autoplay)
      player.src(src)
      player.one('loadeddata', markReady)
      player.one('loadedmetadata', markReady)
      sourceKeyRef.current = sourceKey
      onReadyRef.current?.(player)
    })

    playerRef.current = player

    return () => {
      window.clearTimeout(readyTimeout)
    }
  }, [
    aspectRatio,
    autoplay,
    containVideo,
    fill,
    options,
    sourceKey,
    src,
    useBrandTheme,
    variant,
  ])

  useEffect(() => {
    const player = playerRef.current
    if (!player) {
      return
    }

    player.autoplay(autoplay)

    if (sourceKey && sourceKeyRef.current !== sourceKey) {
      setIsReady(false)
      videoElementRef.current?.classList.remove('vjs-ready')

      const markReady = () => {
        setIsReady(true)
        videoElementRef.current?.classList.add('vjs-ready')
      }
      const readyTimeout = window.setTimeout(markReady, 350)

      player.one('loadeddata', markReady)
      player.one('loadedmetadata', markReady)
      player.src(src)
      sourceKeyRef.current = sourceKey

      return () => {
        window.clearTimeout(readyTimeout)
      }
    }
  }, [autoplay, sourceKey, src])

  useEffect(() => {
    const player = playerRef.current
    // Clean up function to dispose the player after the component unmounts
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div
      className={`video-player h-full w-full transition-opacity duration-300 ${isReady ? 'video-player--ready opacity-100' : 'opacity-0'}`}
      data-vjs-player
    >
      <div ref={videoRef} className={`h-full w-full`} />
    </div>
  )
}

export default Video
