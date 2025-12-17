'use client'
import type { PortableTextBlock } from '@portabletext/types'
import { twMerge } from 'tailwind-merge'
import { ResourceLink } from '@/core/Link'
import type { AspectRatioVariants } from '@/core/VideoJsPlayer/Video'
import {
  type VideoControlsType,
  VideoPlayer,
  type VideoType,
} from '@/core/VideoJsPlayer/VideoPlayer'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import { getLocaleFromName } from '@/sanity/helpers/localization'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions, LinkData } from '@/types'
import Transcript from '../Transcript/Transcript'

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
      {title && <Blocks value={title} variant='h2' />}
      {ingress && (
        <Blocks
          variant='ingress'
          value={ingress}
          blockClassName={`${action && action.label && actionUrl ? 'mb-4' : 'mb-8'}`}
        />
      )}
      {action && action.label && actionUrl && (
        <ResourceLink
          href={actionUrl || ''}
          extension={action?.extension}
          showExtensionIcon={true}
          variant='fit'
          hrefLang={
            action?.type === 'internalUrl'
              ? getLocaleFromName(action?.link?.lang)
              : undefined
          }
          className='mt-4 mb-8'
        >
          {action.label}
        </ResourceLink>
      )}
      {/*@ts-ignore: TODO*/}
      <VideoPlayer
        {...video}
        {...videoPlayerDesignOptions}
        {...videoControls}
      />
      <Transcript transcript={transcript} ariaTitle={video.title} />
    </section>
  )
}

export default VideoPlayerBlock
