import * as React from 'react'
import { useEffect, HTMLProps, useState, useCallback } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
//import 'video.js/dist/video-js.css'
import { play_circle, pause_circle, play } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'
import MediaError from 'video.js/dist/types/media-error'
import useVideojsAnalytics from '../../../lib/hooks/useVideojsAnalytics'

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
  const [player, setPlayer] = useState<Player | null>(null)
  const [showPlayButton, setShowPlayButton] = useState(playButton)
  const [showControls, setShowControls] = useState(controls)
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
        setShowPlayButton(false)
        setShowControls(true && controls)
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
        controls: showControls,
        ...(!useFillMode && { aspectRatio: aspectRatio }),
        bigPlayButton: !controls,
        controlbar: true,
        loadingSpinner: !autoPlay,
        controlBar: {
          fullscreenToggle: allowFullScreen,
        },
        ...rest,
      },
      () => {
        onReady && onReady(player)
      },
    )

    player.on('error', (error: MediaError) => {
      console.log(error.message)
    })
    return player
  }

  useEffect(() => {
    playButton && setShowControls(false)
  }, [playButton])

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
      <video ref={measuredRef} className="vjs-envis video-js vjs-fill" poster={poster}></video>
      {showPlayButton && (
        <button
          className={`${
            useBrandTheme ? 'text-energy-red-100' : 'text-white-100'
          } absolute inset-0 m-auto bg-transparent border-transparent cursor-pointer [&_svg]:inline [&_svg]:align-baseline`}
          onClick={handlePlayButton}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <Icon
            size={48}
            color="currentColor"
            style={{ opacity: useBrandTheme ? 1 : 0.8, height: 80, width: 80 }}
            data={play_circle}
            aria-label={isPlaying ? 'Pause icon' : 'Play icon'}
          />
        </button>
      )}
      {!showPlayButton && autoPlay && (
        <button
          className="absolute bottom-0 right-0 m-auto z-10 bg-transparent border-none cursor-pointer opacity-40 text-white hover:opacity-60 md:svg"
          onClick={handlePlayButton}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <Icon
            size={32}
            color="white"
            style={{ opacity: 0.8 }}
            data={isPlaying ? pause_circle : play_circle}
            aria-label={isPlaying ? 'Pause icon' : 'Play icon'}
          />
        </button>
      )}
    </>
  )
}
