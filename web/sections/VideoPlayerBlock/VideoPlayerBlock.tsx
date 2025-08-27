'use client'
import { getUrlFromAction } from '../../common/helpers'
import IngressText from '../../portableText/IngressText'
import { twMerge } from 'tailwind-merge'
import { Heading } from '@/core/Typography'
import { PortableTextBlock } from '@portabletext/types'
import Transcript from '../Transcript/Transcript'
import { ResourceLink } from '@/core/Link'
import { getLocaleFromName } from '../../lib/localization'
import { DesignOptions, LinkData } from '@/types'
import { VideoControlsType, VideoPlayer, VideoPlayerRatios, VideoType } from '@/core/VideoJsPlayer/VideoPlayer'
import { getBgAndDarkFromDesignOptionBackground } from '@/styles/colorKeyToUtilityMap'

export type VideoDesignOptionsType = {
  aspectRatio: VideoPlayerRatios
  height?: number
  width?: 'normal' | 'extraWide'
  useBrandTheme?: boolean
}

export type VideoPlayerBlockProps = {
  id: string
  type: string
  video: VideoType
  videoControls: VideoControlsType
  designOptions: DesignOptions & VideoDesignOptionsType
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  action?: LinkData
  transcript?: PortableTextBlock[]
  anchor?: string
  className?: string
}

const VideoPlayerBlock = ({
  title,
  ingress,
  action,
  video,
  videoControls,
  designOptions,
  transcript,
  anchor,
  className,
}: VideoPlayerBlockProps) => {
  const { width = 'normal', ...videoPlayerDesignOptions } = designOptions
  const actionUrl = action ? getUrlFromAction(action) : ''
  const { bg, dark } = getBgAndDarkFromDesignOptionBackground(designOptions)

  return (
    <section
      className={twMerge(
        `${bg} ${dark ? 'dark' : ''} ${width === 'extraWide' ? 'px-layout-md' : 'px-layout-lg'}`,
        className,
      )}
      id={anchor}
    >
      {title && <Heading value={title} as="h2" variant="xl" className="mb-2 pb-2" />}
      {ingress && (
        <IngressText value={ingress} className={`${action && action.label && actionUrl ? 'mb-4' : 'mb-8'}`} />
      )}
      {action && action.label && actionUrl && (
        <ResourceLink
          href={actionUrl || ''}
          extension={action?.extension}
          showExtensionIcon={true}
          variant="fit"
          hrefLang={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
          className="mt-4 mb-8"
        >
          {action.label}
        </ResourceLink>
      )}
      <VideoPlayer {...video} {...videoPlayerDesignOptions} {...videoControls} />
      <Transcript transcript={transcript} ariaTitle={video.title} />
    </section>
  )
}

export default VideoPlayerBlock
