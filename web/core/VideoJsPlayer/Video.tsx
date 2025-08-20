'use client'
import { useEffect, HTMLProps, useRef } from 'react'
import videojs from 'video.js'
//import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player'
import useVideojsAnalytics from './useVideojsAnalytics'

type VideoProps = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  options?: any
  useBrandTheme?: boolean
  onReady?: (player: Player) => void
}

export const Video: React.FC<VideoProps> = ({ options, onReady, useBrandTheme }) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player>(null)

  console.log('VIDEO -> options', options)
  useVideojsAnalytics(playerRef.current, options.src, options.title, options.autoPlay)

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-layout-large', 'vjs-envis')
      if (useBrandTheme) {
        videoElement.classList.add('vjs-envis-brand')
      }
      if (options?.playButton) {
        videoElement.classList.add('vjs-envis-hasPlayButton')
      }
      if (options?.fill) {
        videoElement.classList.add('vjs-fill', '*:object-cover')
      }
      videoRef.current?.appendChild(videoElement)

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready')
        if (onReady) {
          onReady(player)
        }
      }))
    } else {
      const player = playerRef.current
      player.autoplay(options.autoplay)
      player.src(options.sources)
    }
  }, [onReady, options])

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
    <div className={`video-player ${options?.fill ? 'h-full w-full' : ''}`} data-vjs-player>
      <div ref={videoRef} className={`${options?.fill ? 'h-full w-full' : ''}`} />
    </div>
  )
}
