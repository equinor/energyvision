import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { LoopingVideoData } from '../../../types'
import dynamic from 'next/dynamic'
import { VideoJS } from '@core/VideoJsPlayer'
import { useMediaQuery } from 'lib/hooks/useMediaQuery'

const DEFAULT_MAX_WIDTH = 1920

const DynamicVideoJsComponent = dynamic<React.ComponentProps<typeof VideoJS>>(
  () => import('@core/VideoJsPlayer').then((mod) => mod.VideoJS),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)

export const LoopingVideo = ({ video }: { video: LoopingVideoData }) => {
  const { title, url, thumbnail, ratio } = video
  const thumbnailURL = useSanityLoader(thumbnail, DEFAULT_MAX_WIDTH, undefined)
  const isMobile = useMediaQuery(`(max-width: 1023px)`)
  // Narrow: 4:3 for small screens and 10:3 for large screens
  const aspectRatio = ''
  // aspect-4/3 lg:aspect-10/3
  return (
    <div className={`relative ${ratio == 'narrow' ? 'pb-[75%] md:pb-[30%]' : 'h-[53dvh] lg:h-[65dvh] 4xl:h-[67dvh]'}`}>
      <figure className="justify-center flex m-0 w-full h-full absolute">
        <DynamicVideoJsComponent
          className="absolute w-full h-full object-contain"
          loop
          muted
          autoPlay
          playButton={false}
          title={title}
          poster={thumbnailURL?.src}
          src={url}
          videoDescription={thumbnail.alt}
        />
      </figure>
    </div>
  )
}
