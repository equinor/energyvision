import dynamic from 'next/dynamic'
import { forwardRef, HTMLProps } from 'react'

export type NextVideoPlayerProps = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  src: string
  playButton?: boolean
  videoDescription?: string
  aspectRatio?: string
  loadingSpinner?: boolean
  useBrandTheme?: boolean
}

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

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
    loop,
    ...rest
  },
  ref,
) {
  const config = {
    file: {
      forceVideo: true,
      attributes: {
        muted: muted,
        playsInline: playsInline,
        autoPlay: autoPlay,
        controls: controls,
        loop: loop,
        poster: poster,
        src: src,
      },
    },
  }
  return (
    <ReactPlayer
      autoPlay={autoPlay}
      controls={controls}
      title={title}
      url={src}
      muted={muted}
      playsInline={playsInline}
      allowFullScreen={allowFullScreen}
      config={{
        file: {
          forceVideo: true,
        },
      }}
    />
  )
})
