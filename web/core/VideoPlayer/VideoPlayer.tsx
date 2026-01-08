import type { PortableTextBlock } from '@portabletext/types'
import dynamic from 'next/dynamic'
import { type HTMLProps, Suspense } from 'react'

// Dynamically import the HlsPlayer component, disabling SSR
/* const DynamicHlsPlayer = dynamic(() => import('./HLSPlayer'), {
  ssr: false,
  loading: () => <p>Loading video player...</p>, // Optional loading fallback
}) */

const DynamicHlsPlayer = dynamic(() => import('./HLSPlayer').then((mod) => mod.HlsPlayer), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export type AspectRatioVariants = '16:9' | '9:16' | '2:1' | '10:3' | '4:3' | '21:9'

export type Variants = 'default' | 'fullwidth'

export type VideoPlayerProps = Omit<HTMLProps<HTMLVideoElement>, 'src' | 'poster'> & {
  variant?: Variants
  src: string
  figureCaption?: string | PortableTextBlock[]
  captionClassName?: string
  /* setting this will sett fluid mode to video player */
  aspectRatio?: AspectRatioVariants | undefined
  /** Ignores aspect ratio to enable fill mode */
  useFillMode?: boolean
  useBrandTheme?: boolean
  /** Sets id on return element for anchors */
  id?: string
  poster?: string
  /** For the aspect ratios that apply object cover, override to contain */
  containVideo?: boolean
}

export const VideoPlayer = ({
  variant = 'default',
  id,
  loop = false,
  figureCaption,
  captionClassName = '',
  autoPlay = false,
  title,
  src,
  muted = false,
  playsInline,
  aspectRatio = '16:9',
  useBrandTheme = false,
  useFillMode = false,
  poster,
  className,
  containVideo,
}: VideoPlayerProps) => {
  console.log('VideoPlayer hls src', src)
  const videoOptions = {
    muted: muted ? 'muted' : false,
    playsinline: playsInline,
    loop: loop,
    autoplay: autoPlay,
    preload: autoPlay ? 'auto' : 'none',
    controls: true,
    ...(poster && {
      poster: poster,
    }),
    ...(title && {
      title: title,
    }),
    width: '100%',
    height: 'auto',
  }

  return (
    <div>
      <h1>HLS Video Playback in Next.js</h1>
      <Suspense>
        <DynamicHlsPlayer src={src} videoProps={videoOptions} />
      </Suspense>
    </div>
  )
}
