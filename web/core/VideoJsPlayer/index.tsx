'use client'
import { type HTMLProps, useCallback, useEffect, useState } from 'react'
import videojs from 'video.js'
//import 'video.js/dist/video-js.css'
import type MediaError from 'video.js/dist/types/media-error'
import type Player from 'video.js/dist/types/player'
import { Pause, Play } from '../../icons'
import useVideojsAnalytics from './useVideojsAnalytics'

type VideoJSProps = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  src: string
  playButton?: boolean
  videoDescription?: string
  /* setting this will sett fluid mode to video player */
  aspectRatio?: string
  /** Ignores aspect ratio to enable fill mode */
  useFillMode?: boolean
  loadingSpinner?: boolean
  useBrandTheme?: boolean
  onReady?: (player: Player) => void
}
export const VideoJS: React.FC<VideoJSProps> = ({
  playButton,
  controls,
  autoPlay,
  loop = false,
  title,
  src,
  muted,
  playsInline,
  aspectRatio,
  loadingSpinner,
  onReady,
  useFillMode = false,
  allowFullScreen,
  useBrandTheme,
  poster,
}) => {
  /*   const [isLoading, setIsLoading] = useState<boolean>(true) */
  const [player, setPlayer] = useState<Player | null>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const handlePlayButton = useCallback(() => {
    if (player) {
      if (player.paused()) {
        player.play()
        setIsPlaying(true)
      } else {
        player.pause()
        setIsPlaying(false)
      }
    }
  }, [player])

  const getPlayer = useCallback(
    (node: Element) => {
      const player = videojs(
        node,
        {
          muted: !!muted,
          playsinline: !!playsInline,
          autoplay: !!autoPlay,
          preload: autoPlay ? 'auto' : 'none',
          controls: controls ?? !autoPlay,
          loop: loop,
          responsive: true,
          ...(!useFillMode && { aspectRatio }),
          ...(useFillMode && { fill: true }),
          bigPlayButton: !!playButton && !autoPlay,
          loadingSpinner: loadingSpinner ?? !autoPlay,
          controlBar: {
            fullscreenToggle: !!allowFullScreen,
          },
          vhs: {
            useDevicePixelRatio: true,
            limitRenditionByPlayerDimensions: false,
          },
          html5: {
            useDevicePixelRatio: true,
            limitRenditionByPlayerDimensions: false,
            hls: {
              useDevicePixelRatio: true,
              limitRenditionByPlayerDimensions: false,
            },
          },
        },
        () => {
          videojs.log('player is ready')
          if (onReady) {
            onReady(player)
          }
        },
      )
      /*       if (typeof window !== 'undefined') {
        player.src({
          src: src,
        })
      } */

      player.on('error', (error: MediaError) => {
        console.log(error.message)
      })
      return player
    },
    [
      allowFullScreen,
      aspectRatio,
      autoPlay,
      controls,
      muted,
      onReady,
      playButton,
      playsInline,
      src,
      useFillMode,
      loadingSpinner,
      loop,
    ],
  )

  const measuredRef = useCallback(
    (node: any) => {
      if (node !== null && (!window || typeof window !== 'undefined')) {
        setPlayer(getPlayer(node))
      }
    },
    [getPlayer],
  )

  useEffect(() => {
    if (player) {
      player.src({
        src: src,
        type: 'application/x-mpegURL',
      })
    }
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        setPlayer(null)
      }
    }
  }, [player, src])

  useVideojsAnalytics(player, src, title, autoPlay)

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption*/}
      <video
        ref={measuredRef}
        className={`video-js vjs-layout-large vjs-fill vjs-envis ${useBrandTheme ? 'vjs-envis-brand' : ''} ${
          playButton ? 'vjs-envis-hasPlayButton' : ''
        }`}
        poster={poster}
      ></video>
      {!playButton && !controls && autoPlay && (
        <button
          className="focus-none focus-visible:envis-outline absolute right-0 bottom-0 z-10 m-auto flex size-[48px] cursor-pointer items-center justify-center border-none"
          onClick={handlePlayButton}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <div
            className={`relative flex size-10 items-center justify-center rounded-full bg-black-100/60 hover:bg-black-100`}
          >
            <div className="text-white-100">{isPlaying ? <Pause /> : <Play />}</div>
          </div>
        </button>
      )}
    </>
  )
}
