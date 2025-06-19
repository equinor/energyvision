'use client'
/* eslint-disable jsx-a11y/media-has-caption */
import dynamic from 'next/dynamic'
import {
  VideoControlsType,
  VideoPlayerData,
  VideoPlayerRatios,
  VideoType,
  VideoDesignOptionsType,
} from '../../types/index'
import { BackgroundContainer } from '@core/Backgrounds'
import { getUrlFromAction, urlFor } from '../../common/helpers'
import IngressText from './portableText/IngressText'
import { VideoJS } from '@core/VideoJsPlayer'
import { twMerge } from 'tailwind-merge'
import { Heading } from '@core/Typography'
import { PortableTextBlock } from '@portabletext/types'
import Blocks from './portableText/Blocks'
import Transcript from '../../sections/Transcript/Transcript'
import { ResourceLink } from '@core/Link'
import { getLocaleFromName } from '../../lib/localization'

const DynamicVideoJsComponent = dynamic<React.ComponentProps<typeof VideoJS>>(
  () => import('@core/VideoJsPlayer').then((mod) => mod.VideoJS),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)

const getHeightWidth = (aspectRatio: string, height?: number | string) => {
  if (!height) {
    switch (aspectRatio) {
      case VideoPlayerRatios['1:1']:
        return 'h-[320px] sm:h-[320px] sm:w-[320px] md:h-[487px] md:w-[487px] lg:h-[600px] lg:w-[600px]'
      case VideoPlayerRatios['16:9']:
        return 'h-[56.25%] w-full'
      case VideoPlayerRatios['9:16']:
        return 'h-[569px] w-[320px] sm:h-[600px] sm:w-[337.5px]'
      default:
        return 'w-full h-full'
    }
  }
  return `h-[${typeof height == 'string' ? height : `${height}px`}] w-full`
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

type VideoComponentWithCaptionType = {
  video: VideoType
  videoControls: VideoControlsType
  designOptions: VideoDesignOptionsType
  useFillMode?: boolean
  className?: string
  captionClassName?: string
  title?: PortableTextBlock[]
}
export const VideoComponentWithCaption = ({
  video,
  title,
  videoControls,
  designOptions,
  useFillMode = false,
  className = '',
  captionClassName = '',
}: VideoComponentWithCaptionType) => {
  const { width: w, height: h } = getThumbnailRatio(designOptions.aspectRatio)
  return (
    <figure
      className={twMerge(
        `${useFillMode ? 'h-full w-full' : getHeightWidth(designOptions.aspectRatio, designOptions.height)} 
        [&video::-webkit-media-controls-fullscreen-button]:hidden relative mx-auto my-0
        `,
        className,
      )}
    >
      {video && (
        <DynamicVideoJsComponent
          className="object-cover"
          src={video.url}
          title={video.title}
          poster={urlFor(video.thumbnail?.asset).width(w).height(h).url()}
          playsInline
          aspectRatio={designOptions.aspectRatio}
          useBrandTheme={designOptions?.useBrandTheme}
          useFillMode={useFillMode}
          {...videoControls}
        />
      )}
      <figcaption className={twMerge(`text-md ${title ? 'py-2' : ''}`, captionClassName)}>
        {title && <Blocks value={title} />}
      </figcaption>
    </figure>
  )
}

type VideoJsComponentType = {
  video: VideoType
  videoControls: VideoControlsType
  designOptions: VideoDesignOptionsType
  useFillMode?: boolean
  className?: string
}
export const VideoJsComponent = ({
  video,
  videoControls,
  designOptions,
  useFillMode = false,
  className = '',
}: VideoJsComponentType) => {
  const { width: w, height: h } = getThumbnailRatio(designOptions.aspectRatio)
  return (
    <figure
      className={twMerge(
        `
        ${useFillMode ? 'h-full w-full' : getHeightWidth(designOptions.aspectRatio, designOptions.height)} 
        [&video::-webkit-media-controls-fullscreen-button]:hidden relative mx-auto my-0
        `,
        className,
      )}
    >
      <DynamicVideoJsComponent
        className="object-cover"
        src={video.url}
        title={video.title}
        poster={video.thumbnail?.asset && urlFor(video.thumbnail).width(w).height(h).url()}
        playsInline
        aspectRatio={designOptions.aspectRatio}
        useBrandTheme={designOptions?.useBrandTheme}
        useFillMode={useFillMode}
        {...videoControls}
      />
    </figure>
  )
}

const VideoPlayer = ({ anchor, data, className }: { data: VideoPlayerData; anchor?: string; className?: string }) => {
  const { title, ingress, action, video, videoControls, designOptions, transcript } = data
  const { width } = designOptions
  const actionUrl = action ? getUrlFromAction(action) : ''

  return (
    <BackgroundContainer
      {...designOptions.background}
      className={twMerge(` ${width === 'extraWide' ? 'px-layout-md' : 'px-layout-lg'}`, className)}
      id={anchor}
      renderFragmentWhenPossible
    >
      {title && <Heading value={title} as="h2" variant="xl" className="mb-2 pb-2" />}
      {ingress && <IngressText value={ingress} className="mb-lg" />}
      {action && action.label && actionUrl && (
        <ResourceLink
          href={actionUrl || ''}
          extension={action?.extension}
          showExtensionIcon={true}
          variant="fit"
          locale={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
          className="mt-4 mb-2"
        >
          {action.label}
        </ResourceLink>
      )}
      <VideoJsComponent video={video} designOptions={designOptions} videoControls={videoControls} />
      <Transcript transcript={transcript} ariaTitle={video.title} />
    </BackgroundContainer>
  )
}

export default VideoPlayer
