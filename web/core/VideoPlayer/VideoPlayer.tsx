import { forwardRef, HTMLProps } from 'react'
import Player from 'next-video/player'

export type NextVideoPlayerProps = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  src: string
  playButton?: boolean
  videoDescription?: string
  aspectRatio?: string
  loadingSpinner?: boolean
  useBrandTheme?: boolean
}

export const NextVideoPlayer = forwardRef<HTMLElement, NextVideoPlayerProps>(function NextVideoPlayer(
  {
    className = '',
    playButton,
    controls,
    autoPlay,
    title,
    src,
    poster,
    muted,
    playsInline,
    aspectRatio,
    loadingSpinner,
    useBrandTheme = false,
    allowFullScreen,
    ...rest
  },
  ref,
) {
  const config = {
    sources: {
      type: 'application/x-mpegURL',
    },
    /*     file: {
      attributes: { poster },
    }, */
  }
  return (
    <Player
      autoPlay={autoPlay}
      config={config}
      controls={controls}
      title={title}
      muted={muted}
      playsInline={playsInline}
      playButton={playButton}
      allowFullScreen={allowFullScreen}
      src={src}
      poster={poster}
    />
  )
})
