import * as React from 'react'
import { useEffect, HTMLProps, useState, useCallback } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
//import 'video.js/dist/video-js.css'
import MediaError from 'video.js/dist/types/media-error'
import useVideojsAnalytics from '../../../lib/hooks/useVideojsAnalytics'
import { Play, Pause } from '../../../icons'

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
  title,
  src,
  muted,
  playsInline,
  aspectRatio,
  onReady,
  loadingSpinner,
  useBrandTheme = false,
  useFillMode = false,
  poster,
  allowFullScreen,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [player, setPlayer] = useState<Player | null>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const measuredRef = useCallback((node: any) => {
    if (node !== null) {
      setPlayer(getPlayer(node))
    }
  }, [])

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

  const getPlayer = (node: Element) => {
    const player = videojs(
      node,
      {
        sources: [
          {
            src: src,
            type: 'application/x-mpegURL',
          },
        ],
        muted: muted ? 'muted' : false,
        playsinline: playsInline,
        autoplay: autoPlay,
        preload: autoPlay ? 'auto' : 'none',
        controls: controls ?? !autoPlay,
        responsive: true,
        ...(!useFillMode && { aspectRatio: aspectRatio }),
        ...(useFillMode && { fill: true }),
        bigPlayButton: playButton && !autoPlay,
        controlbar: true,
        loadingSpinner: !autoPlay,
        controlBar: {
          fullscreenToggle: allowFullScreen,
        },
        html5: {
          useDevicePixelRatio: true,
          limitRenditionByPlayerDimensions: false,
          hls: {
            useDevicePixelRatio: true,
            limitRenditionByPlayerDimensions: false,
          },
        },
        ...rest,
      },
      () => {
        onReady && onReady(player)
        onReady && setIsLoading(false)
      },
    )

    player.on('error', (error: MediaError) => {
      console.log(error.message)
    })
    return player
  }

  useEffect(() => {
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        setPlayer(null)
      }
    }
  }, [player])

  useVideojsAnalytics(player, src, title, autoPlay)

  return (
    <>
      {/* eslint-disable-next-line */}
      <video
        ref={measuredRef}
        className={`video-js vjs-layout-large vjs-fill vjs-envis ${useBrandTheme ? 'vjs-envis-brand' : ''}
        ${playButton ? 'vjs-envis-hasPlayButton' : ''}`}
        poster={poster}
      ></video>
      {!playButton && !controls && autoPlay && (
        <button
          className="absolute 
          bottom-0 
          right-0 
          m-auto 
          size-[48px] 
          flex 
          justify-center 
          items-center
          z-10 
          border-none 
          cursor-pointer 
          focus-none
          focus-visible:envis-outline
          "
          onClick={handlePlayButton}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <div
            className={`
          relative
          flex 
          justify-center
          items-center
          rounded-full 
          size-10 
          bg-black-100/60 
          hover:bg-black-100 
          `}
          >
            <div className=" text-white-100">{isPlaying ? <Pause /> : <Play />}</div>
          </div>
        </button>
      )}
    </>
  )
}
