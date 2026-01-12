/* eslint-disable jsx-a11y/media-has-caption */

import { BackgroundContainer } from '@core/Backgrounds'
import HlsVideoPlayer from '@core/HlsVideoPlayer/HlsVideoPlayer'
import { ResourceLink } from '@core/Link'
import { getTwAspectRatioUtilityOnRatio, ImageRatioKeys } from '@core/SanityImage/SanityImage'
import { Heading } from '@core/Typography'
/* import type { VideoJS } from '@core/VideoJsPlayer' */
import type { PortableTextBlock } from '@portabletext/types'
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction, urlFor } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import Transcript from '../../sections/Transcript/Transcript'
import {
  type VideoControlsType,
  type VideoDesignOptionsType,
  type VideoPlayerData,
  VideoPlayerRatios,
  type VideoType,
} from '../../types/index'
import Blocks from './portableText/Blocks'
import IngressText from './portableText/IngressText'

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

export const getThumbnailRatio = (aspectRatio: string, height?: number) => {
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
  designOptions,
  useFillMode = false,
  className = '',
  captionClassName = '',
}: VideoComponentWithCaptionType) => {
  const { width: w, height: h } = getThumbnailRatio(designOptions.aspectRatio)

  return (
    //[&video::-webkit-media-controls-fullscreen-button]:hidden
    <figure
      className={twMerge(
        `${
          useFillMode ? 'h-full w-full' : getHeightWidth(designOptions.aspectRatio, designOptions.height)
        } relative mx-auto my-0 `,
        className,
      )}
    >
      {video && (
        /*         <DynamicVideoJsComponent
          className="object-cover"
          src={video.url}
          title={video.title}
          poster={urlFor(video.thumbnail?.asset).width(w).height(h).url()}
          playsInline
          aspectRatio={designOptions.aspectRatio}
          useBrandTheme={designOptions?.useBrandTheme}
          useFillMode={useFillMode}
          {...videoControls}
        /> */
        <HlsVideoPlayer
          variant="default"
          src={video.url}
          //@ts-ignore:todo
          aspectRatio={designOptions.aspectRatio}
          poster={urlFor(video.thumbnail?.asset).width(w).height(h).url()}
          title={video.title}
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
export const VideoComponent = ({ video, designOptions, useFillMode = false, className = '' }: VideoJsComponentType) => {
  const { width: w, height: h } = getThumbnailRatio(designOptions.aspectRatio)
  const ratioUtility = getTwAspectRatioUtilityOnRatio(designOptions.aspectRatio as ImageRatioKeys)

  return (
    <figure
      className={twMerge(
        `relative [&video::-webkit-media-controls-fullscreen-button]:hidden`,
        ratioUtility,
        useFillMode ? 'h-full w-full' : getHeightWidth(designOptions?.aspectRatio, designOptions?.height),
        className,
      )}
    >
      {/*       <DynamicVideoJsComponent
        className="object-cover"
        src={video.url}
        title={video.title}
        poster={video.thumbnail?.asset && urlFor(video.thumbnail).width(w).height(h).url()}
        playsInline
        aspectRatio={designOptions.aspectRatio}
        useBrandTheme={designOptions?.useBrandTheme}
        useFillMode={useFillMode}
        {...videoControls}
      /> */}
      {video && (
        <HlsVideoPlayer
          variant="default"
          src={video?.url}
          //@ts-ignore:todo
          aspectRatio={designOptions?.aspectRatio}
          poster={urlFor(video.thumbnail?.asset).width(w).height(h).url()}
          title={video.title}
        />
      )}
    </figure>
  )
}

const VideoPlayer = ({ anchor, data, className }: { data: VideoPlayerData; anchor?: string; className?: string }) => {
  const { title, ingress, action, video, videoControls, designOptions, transcript } = data
  const { width } = designOptions
  const actionUrl = action ? getUrlFromAction(action) : ''

  console.log('VideoPlayer transcript', transcript)
  console.log('VideoPlayer data', data)
  console.log('VideoPlayer video', video)

  return (
    <BackgroundContainer
      {...designOptions.background}
      className={twMerge(`px-layout-sm ${width === 'extraWide' ? 'lg:px-layout-md' : 'lg:px-layout-lg'}`, className)}
      id={anchor}
      renderFragmentWhenPossible
    >
      {(title || ingress || action) && (
        <div className={`pb-6`}>
          {title && <Heading value={title} as="h2" variant="xl" className="mb-2 pb-2" />}
          {ingress && <IngressText value={ingress} className="mb-lg" />}
          {action && action?.label && actionUrl && (
            <ResourceLink
              href={actionUrl || ''}
              file={{
                ...action?.file,
                label: action?.label,
              }}
              showExtensionIcon={true}
              variant="fit"
              locale={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
              className="mt-4"
            >
              {action.label}
            </ResourceLink>
          )}
        </div>
      )}
      <VideoComponent
        video={video}
        designOptions={designOptions}
        videoControls={videoControls}
        className={`flex ${title || ingress || action ? 'justify-start' : 'justify-center'}`}
      />
      <Transcript transcript={transcript} ariaTitle={video.title} />
    </BackgroundContainer>
  )
}

export default VideoPlayer
