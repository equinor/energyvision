'use client'
import { useEffect, HTMLProps, useRef } from 'react'
import videojs from 'video.js'
//import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player'
import useVideojsAnalytics from './useVideojsAnalytics'

//Needed?
export enum VideoPlayerRatios {
  '16:9' = '16:9',
  '9:16' = '9:16',
  '1:1' = '1:1',
  '4:3' = '4:3',
}

export type AspectRatioVariants = '16:9' | '9:16' | '2:1' | '10:3' | '4:3' | '21:9'

type VideoOptions = {
  playButton?: boolean
  autoplay?: boolean
  fill?: boolean
  aspectRatio: AspectRatioVariants
  src: string
} & Omit<HTMLProps<HTMLVideoElement>, 'src'>

type VideoProps = {
  options: VideoOptions
  useBrandTheme?: boolean
  /** For the aspect ratios that apply object cover, override to contain */
  containVideo?: boolean
  onReady?: (player: Player) => void
} & Omit<HTMLProps<HTMLVideoElement>, 'src'>

export const Video: React.FC<VideoProps> = ({ options, onReady, useBrandTheme = false, containVideo = false }) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player>(null)
  const { src, title, autoplay = false, fill, aspectRatio } = options

  //Here or in the VideoPlayer?
  useVideojsAnalytics(playerRef.current, src, title, autoplay)

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-layout-large', 'vjs-envis')
      if (useBrandTheme) {
        videoElement.classList.add('vjs-envis-brand')
      }

      if (!containVideo && (fill || aspectRatio === '10:3' || aspectRatio === '21:9')) {
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

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready')
        if (onReady) {
          onReady(player)
        }
      }))
    } else {
      const player = playerRef.current
      player.autoplay(autoplay)
      player.src(src)
    }
  }, [autoplay, onReady, options, src, useBrandTheme])

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
    <div className={`video-player h-full w-full`} data-vjs-player>
      <div ref={videoRef} className={`h-full w-full`} />
    </div>
  )
}
