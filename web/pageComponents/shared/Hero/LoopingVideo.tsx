import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { LoopingVideoData } from '../../../types'
import dynamic from 'next/dynamic'
import { VideoJS } from '@core/VideoJsPlayer'

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
  return (
    <div className={`relative ${ratio == 'narrow' ? 'pb-3/4 md:pb-[30%]' : 'pb-1/2'}`}>
      <figure className="justify-center flex m-0 w-full h-full absolute">
        <DynamicVideoJsComponent
          className="absolute w-full h-full object-cover"
          loop
          muted
          autoPlay
          playButton={false}
          title={title}
          poster={thumbnailURL.src}
          src={url}
          videoDescription={thumbnail.alt}
        />
      </figure>
    </div>
  )
}
