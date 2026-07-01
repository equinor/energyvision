'use client'
import type { PortableTextBlock } from '@portabletext/types'
import { toPlainText } from 'next-sanity'
import { Image } from '@/core/Image/Image'
import {
  getObjectPositionForImage,
  type Image as ImageType,
} from '@/core/Image/imageUtilities'
import ResourceLink from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { twMerge } from '@/lib/twMerge/twMerge'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { getIsoFromName } from '../../../sanity/helpers/localization'
import type { DesignOptions, LinkData } from '../../../types/index'

export type TeaserData = {
  type: string
  id: string
  title: PortableTextBlock[]
  content: PortableTextBlock[]
  overline?: string
  image: ImageType
  actions?: LinkData[]
  designOptions: DesignOptions & {
    imagePosition?: 'left' | 'right'
    imageSize?: 'full' | 'small'
    containImage?: boolean
  }
}

type TeaserProps = {
  data: TeaserData
  anchor?: string
}

const Teaser = ({ data, anchor }: TeaserProps) => {
  const { title, overline, content, image, actions, designOptions } = data
  const {
    imageSize = 'full',
    imagePosition = 'right',
    containImage = false,
    background,
  } = designOptions

  const { backgroundPosition } = background || {}
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  const isLargerDisplays = useMediaQuery(`(min-width: 1650px)`)

  if ([title, overline, content, image?.asset, actions].every(i => !i)) {
    return null
  }

  const isSvg = image.extension === 'svg' && imageSize === 'small'

  // Svg can be "pictures"/illustrations and small svgs...
  const imageElement = (
    <div
      className={twMerge(
        `relative ${
          isSvg
            ? 'mx-18 flex h-auto items-center justify-center'
            : 'h-auto min-h-[25rem] w-full'
        }`,
        imagePosition === 'right' && 'lg:order-last',
      )}
    >
      <Image
        image={image}
        fill={!isSvg}
        wrapperVariant='none'
        grid='lg'
        keepRatioOnMobile
        aspectRatio={isLargerDisplays ? '16:9' : '4:3'}
        imageClassName={`${
          containImage ? 'object-contain' : ''
        } ${getObjectPositionForImage(backgroundPosition ?? 'center_center')}`}
      />
    </div>
  )

  return (
    <article
      id={anchor}
      className={`max-w-fullwidth ${bg} ${dark ? 'dark' : ''}`}
    >
      <div
        className={twMerge(
          'mx-auto flex max-w-360 flex-col lg:grid lg:grid-cols-2',
        )}
      >
        {imageElement}
        <div
          className={twMerge(
            `max-w-text px-8 pt-8 pb-10 lg:pt-18 lg:pb-22`,
            imagePosition === 'right' && 'lg:order-first',
          )}
        >
          {overline ? (
            <hgroup className='mb-1'>
              <Typography variant='overline'>{overline}</Typography>
              {title && (
                <Blocks value={title} as='h2' group='heading' variant='h2' />
              )}
            </hgroup>
          ) : (
            title && (
              <Blocks value={title} as='h2' group='heading' variant='h2' />
            )
          )}
          {content && (
            <Blocks
              variant={toPlainText(content)?.length > 240 ? 'body' : 'ingress'}
              value={content}
            />
          )}
          {actions && (
            <div className='mt-8 flex flex-col gap-x-8 gap-y-6'>
              {actions?.map((action, idx) => {
                const url = action && getUrlFromAction(action)
                return (
                  <ResourceLink
                    href={url as string}
                    {...(action.link?.lang && {
                      hrefLang: getIsoFromName(action.link?.lang),
                    })}
                    type={action.type}
                    key={action.id || idx}
                    variant='fit'
                    file={{
                      ...action?.file,
                      label: action?.label,
                    }}
                  >
                    {`${action.label}`}
                  </ResourceLink>
                )
              })}
            </div>
          )}
        </div>
        {/*         {imagePosition === 'right' && !useFlexCol && imageElement} */}
      </div>
    </article>
  )
}

export default Teaser
