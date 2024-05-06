/* eslint-disable jsx-a11y/media-has-caption */
import dynamic from 'next/dynamic'
import {
  VideoControlsType,
  VideoPlayerData,
  VideoPlayerRatios,
  VideoType,
  VideoDesignOptionsType,
} from '../../types/types'
import { BackgroundContainer } from '@components'
import { urlFor } from '../../common/helpers'
import IngressText from './portableText/IngressText'
import envisTwMerge from '../../twMerge'
import { VideoJS } from '@components/VideoJsPlayer'
import { Heading } from '@core/Typography'
import CallToActions from '@sections/CallToActions'

const DynamicVideoJsComponent = dynamic<React.ComponentProps<typeof VideoJS>>(
  () => import('../../components/src/VideoJsPlayer').then((mod) => mod.VideoJS),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)

const getHeightWidth = (aspectRatio: string, height?: number, overrideHeight?: string) => {
  if (!height) {
    switch (aspectRatio) {
      case VideoPlayerRatios['1:1']:
        return 'h-[320px] sm:h-[320px] sm:w-[320px] md:h-[487px] md:w-[487px] lg:h-[600px] lg:w-[600px]'
      case VideoPlayerRatios['16:9']:
        return overrideHeight ? `h-[${overrideHeight}] w-full` : 'h-[56.25%] w-full'
      case VideoPlayerRatios['9:16']:
        return 'h-[569px] w-[320px] sm:h-[600px] sm:w-[337.5px]'
    }
  }
  return `h-[${height}px] w-full`
}

const getThumbnailRatio = (aspectRatio: string, height?: number) => {
  switch (aspectRatio) {
    case VideoPlayerRatios['16:9']:
      return {
        width: 1380,
        height: 777,
      }
    case VideoPlayerRatios['9:16']:
      return {
        width: 336,
        height: 600,
      }
    case VideoPlayerRatios['1:1']:
      return {
        width: 600,
        height: 600,
      }
    default:
      return {
        width: 0,
        height: height || 0,
      }
  }
}

type VideoJsComponentType = {
  video: VideoType
  videoControls: VideoControlsType
  designOptions: VideoDesignOptionsType
  height?: string
  useFillMode?: boolean
}

export const VideoJsComponent = ({
  video,
  videoControls,
  designOptions,
  useFillMode = false,
  height,
}: VideoJsComponentType) => {
  const { width: w, height: h } = getThumbnailRatio(designOptions.aspectRatio)
  return (
    <figure
      className={`
        ${useFillMode ? 'h-full w-full' : getHeightWidth(designOptions.aspectRatio, designOptions.height, height)} 
        [&video::-webkit-media-controls-fullscreen-button]:hidden relative mx-auto my-0
        `}
    >
      <DynamicVideoJsComponent
        className="object-cover"
        src={video.url}
        title={video.title}
        poster={urlFor(video.thumbnail).width(w).height(h).url()}
        playsInline
        aspectRatio={designOptions.aspectRatio}
        useBrandTheme={designOptions?.useBrandTheme}
        useFillMode={useFillMode}
        {...videoControls}
      />
    </figure>
  )
}

const VideoPlayer = ({
  anchor,
  data,
  height,
  className,
}: {
  data: VideoPlayerData
  anchor?: string
  className?: string
  height?: string
}) => {
  const { title, ingress, action, video, videoControls, designOptions } = data
  const { width } = designOptions
  return (
    <BackgroundContainer {...designOptions.background} id={anchor} renderFragmentWhenPossible>
      <div
        className={envisTwMerge(
          `pb-page-content ${width === 'extraWide' ? 'px-layout-md' : 'px-layout-lg'} max-w-viewport mx-auto`,
          className,
        )}
      >
        {title && <Heading value={title} as="h2" variant="xl" className="mb-2 pb-2" />}
        {ingress && <IngressText value={ingress} className="mb-lg" />}
        {action && action.label && <CallToActions callToActions={[action]} overrideButtonStyle={false} />}
        <VideoJsComponent video={video} designOptions={designOptions} videoControls={videoControls} height={height} />
      </div>
    </BackgroundContainer>
  )
}

export default VideoPlayer
