import React, { useRef, useEffect, HTMLAttributes, HTMLProps, useState, useCallback } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'
import { play_circle, pause_circle, play } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'
import Hls from 'hls.js'
import MediaError from 'video.js/dist/types/media-error'
import useVideojsAnalytics from '../../../lib/hooks/useVideojsAnalytics'

type VideoJSProps = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  src: string
  playButton?: boolean
  videoDescription?: string
  aspectRatio?: string
  loadingSpinner?: boolean
  onReady: (player: Player) => void
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
  ...rest
}) => {
  const [player, setPlayer] = useState<Player | null>(null)
  const [showPlayButton, setShowPlayButton] = useState(playButton)
  const [showControls, setShowControls] = useState(controls)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const measuredRef = useCallback((node: any) => {
    if (node !== null) {
      if (player && !player.isDisposed()) {
        console.log('Dispose ' + player.id())
      } else setPlayer(getPlayer(node))
    }
  }, [])

  const handlePlayButton = useCallback(() => {
    if (player) {
      if (player.paused()) {
        player.play()
        setShowPlayButton(false)
        setShowControls(true)
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
        aspectRatio,
        bigPlayButton: !controls,
        controlbar: true,
        loadingSpinner: !autoPlay,
        ...rest,
      },
      () => {
        onReady && onReady(player)
      },
    )

    player.on(Hls.Events.ERROR, (error: MediaError) => {
      console.log(error.message)
    })
    return player
  }

  useEffect(() => {
    player?.controls(showControls)
  }, [player, showControls])
  useVideojsAnalytics(player, src, title)

  return (
    <>
      <video ref={measuredRef} className="video-js vjs-fill"></video>
      {showPlayButton && (
        <button
          className="absolute inset-0 m-auto z-10 bg-transparent border-transparent cursor-pointer"
          onClick={handlePlayButton}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <Icon
            size={48}
            color="white"
            style={{ opacity: 0.8 }}
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
