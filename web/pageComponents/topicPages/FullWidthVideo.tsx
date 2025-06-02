import { FullWidthVideoData, FullWidthVideoRatio } from '../../types/index'
import { VideoJS } from '@core/VideoJsPlayer'
import dynamic from 'next/dynamic'

const DynamicVideosComponent = dynamic<React.ComponentProps<typeof VideoJS>>(
  () => import('@core/VideoJsPlayer').then((mod) => mod.VideoJS),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)

const FullWidthVideo = ({ anchor, data }: { data: FullWidthVideoData; anchor?: string }) => {
  const { video, designOptions, spacing } = data
  const { aspectRatio } = designOptions

  const containerClassName = (aspectRatio: FullWidthVideoRatio): string => {
    let className = 'pb-[50%]'
    switch (aspectRatio) {
      case 'fullScreen':
        className = 'h-screen'
        break
      case 'narrow':
        className = `pb-[75%] md:pb-[30%]`
        break
      case '2:1':
        className = 'pb-[50%]'
        break
      default:
        className = 'pb-[50%]'
    }
    return className
  }
  return (
    <div
      id={anchor}
      className={`relative w-full ${containerClassName(aspectRatio)}`}
      style={spacing ? { marginTop: '50px', marginBottom: '50px' } : {}}
    >
      <figure className="justify-center flex m-0 top-0 left-0 w-full h-full absolute">
        <DynamicVideosComponent
          className="absolute top-0 left-0 w-full h-full"
          title={video.title}
          autoPlay
          muted
          loop
          src={video.url}
          playsInline
        />
      </figure>
    </div>
  )
}

export default FullWidthVideo
