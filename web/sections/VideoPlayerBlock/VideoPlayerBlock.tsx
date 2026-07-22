import type { PortableTextBlock } from '@portabletext/types'
import dynamic from 'next/dynamic'
import ResourceLink from '@/core/Link/ResourceLink'
import type { AspectRatioVariants } from '@/core/VideoJsPlayer/Video'
import type {
  VideoControlsType,
  VideoType,
} from '@/core/VideoJsPlayer/VideoPlayer'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { twMerge } from '@/lib/twMerge/twMerge'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions, LinkData } from '@/types'
import Transcript from '../Transcript/Transcript'

export type VideoDesignOptionsType = {
  aspectRatio: AspectRatioVariants
  height?: number
  width?: 'normal' | 'extraWide' | 'narrow'
  useBrandTheme?: boolean
  clipRoundedCornersPortrait?: boolean
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

const VideoPlayer = dynamic(() => import('@/core/VideoJsPlayer/VideoPlayer'))

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

  const isNarrowFeature =
    width === 'narrow' || videoPlayerDesignOptions?.aspectRatio === '9:16'

  return (
    <section
      className={twMerge(
        `mx-auto h-auto w-full max-w-content ${bg} ${dark ? 'dark' : ''} px-layout-sm ${width === 'extraWide' ? 'lg:px-layout-md' : 'lg:px-layout-lg'}`,
        className,
      )}
      id={anchor}
    >
      {(title || ingress || action?.label) && (
        <div className='pb-6'>
          {title && <Blocks value={title} variant='h2' />}
          {ingress && (
            <Blocks
              variant='ingress'
              value={ingress}
              blockClassName={`${action?.label && actionUrl ? 'mb-4' : 'mb-8'}`}
            />
          )}
          {action?.label && actionUrl && (
            <ResourceLink
              href={actionUrl || ''}
              file={{
                ...action?.file,
                label: action?.label,
              }}
              variant='fit'
              hrefLang={
                action?.type === 'internalUrl'
                  ? action?.link?.lang
                  : undefined
              }
              className='mt-4 mb-8'
            >
              {action.label}
            </ResourceLink>
          )}
        </div>
      )}
      {/*@ts-ignore: TODO*/}

      <div
        className={twMerge(
          'h-auto w-full overflow-hidden rounded-card',
          isNarrowFeature && 'mx-auto',
          isNarrowFeature &&
            videoPlayerDesignOptions?.aspectRatio === '9:16' &&
            'w-101.5',
          isNarrowFeature &&
            videoPlayerDesignOptions?.aspectRatio === '16:9' &&
            'w-200',
          isNarrowFeature &&
            videoPlayerDesignOptions?.aspectRatio === '1:1' &&
            'w-150',
        )}
      >
        <VideoPlayer
          {...video}
          {...videoPlayerDesignOptions}
          {...videoControls}
        />
      </div>
      <Transcript transcript={transcript} ariaTitle={video.title} />
    </section>
  )
}

export default VideoPlayerBlock
