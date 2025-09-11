'use client'
import { getUrlFromAction } from '../../common/helpers'
import { twMerge } from 'tailwind-merge'
import { PortableTextBlock } from '@portabletext/types'
import Transcript from '../Transcript/Transcript'
import { ResourceLink } from '@/core/Link'
import { getLocaleFromName } from '../../lib/localization'
import { DesignOptions, LinkData } from '@/types'
import { VideoControlsType, VideoPlayer, VideoType } from '@/core/VideoJsPlayer/VideoPlayer'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { AspectRatioVariants } from '@/core/VideoJsPlayer/Video'
import Blocks from '@/portableText/Blocks'

export type VideoDesignOptionsType = {
  aspectRatio: AspectRatioVariants
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
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  return (
    <section
      className={twMerge(
        `${bg} ${dark ? 'dark' : ''} ${width === 'extraWide' ? 'px-layout-md' : 'px-layout-lg'}`,
        className,
      )}
      id={anchor}
    >
      {/* classname mb-2 pb-2  or common heading 2 styling pb-8 and inheriting pt-20 if applicable */}
      {title && <Blocks value={title} variant="h2" />}
      {ingress && (
        <Blocks
          variant="ingress"
          value={ingress}
          blockClassName={`${action && action.label && actionUrl ? 'mb-4' : 'mb-8'}`}
        />
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
      {/*@ts-ignore: TODO*/}
      <VideoPlayer {...video} {...videoPlayerDesignOptions} {...videoControls} />
      <Transcript transcript={transcript} ariaTitle={video.title} />
    </section>
  )
}

export default VideoPlayerBlock
