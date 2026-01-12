import HlsVideoPlayer, { getThumbnailRatio } from '@core/HlsVideoPlayer/HlsVideoPlayer'
import { urlFor } from '../../common/helpers'
import { FullWidthVideoData, FullWidthVideoRatio } from '../../types/index'

const FullWidthVideo = ({ anchor, data }: { data: FullWidthVideoData; anchor?: string }) => {
  console.log('FullWidthVideo data', data)
  const { video, designOptions, spacing } = data
  const { aspectRatio } = designOptions

  const ratio = {
    fullScreen: '16:9',
    narrow: '10:3',
    '2:1': '2:1',
  }

  const containerClassName = (aspectRatio: FullWidthVideoRatio): string => {
    let className = 'pb-[50%]'
    switch (aspectRatio) {
      case 'fullScreen':
        className = 'h-screen'
        break
      case 'narrow':
        className = `pb-[75%] md:pb-[30%]`
        break
      default:
        className = 'pb-[50%]'
    }
    return className
  }

  const { width: w, height: h } = getThumbnailRatio(ratio[aspectRatio])

  const posterUrl = video?.thumbnail?.asset ? urlFor(video.thumbnail?.asset).width(w).height(h)?.url() : undefined

  return (
    <div
      id={anchor}
      className={`relative w-full ${containerClassName(aspectRatio)}`}
      style={spacing ? { marginTop: '50px', marginBottom: '50px' } : {}}
    >
      <figure className="justify-center flex m-0 top-0 left-0 w-full h-full absolute">
        {/*         <DynamicVideosComponent
          className="absolute top-0 left-0 w-full h-full"
          title={video.title}
          autoPlay
          muted
          loop
          src={video.url}
          playsInline
        /> */}
        <HlsVideoPlayer
          variant="fullwidth"
          src={video.url}
          //@ts-ignore:todo
          aspectRatio={ratio[aspectRatio]}
          poster={posterUrl}
          autoPlay
          loop
          muted
        />
      </figure>
    </div>
  )
}

export default FullWidthVideo
