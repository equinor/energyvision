'use client'
import type { PortableTextBlock } from '@portabletext/types'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import {
  getObjectPositionForImage,
  type Image as ImageType,
  mapSanityImageRatio,
  type ObjectPositions,
} from '@/core/Image/imageUtilities'
import ResourceLink from '@/core/Link/ResourceLink'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import Blocks from '@/portableText/Blocks'
import { getLocaleFromName } from '@/sanity/helpers/localization'
import { resolveImage } from '@/sanity/lib/utils'
import type { LinkData } from '../../types'
import type { InfoPanelImageVariant, InfoPanelKeyInfo } from './TabsBlock.types'

type TabsInfoPanelItemProps = {
  theme?: number
  image?: ImageType
  caption?: string
  imageVariant?: InfoPanelImageVariant
  title?: PortableTextBlock[]
  text?: PortableTextBlock[]
  keyInfo?: InfoPanelKeyInfo[]
  backgroundPosition?: ObjectPositions
  actions?: LinkData[]
  className?: string
  keyInfoTitle?: string
}

const TabsInfoPanelItem = forwardRef<HTMLDivElement, TabsInfoPanelItemProps>(
  function TabsInfoPanelItem(
    {
      image,
      caption,
      imageVariant,
      backgroundPosition,
      title,
      text,
      keyInfo,
      actions,
      keyInfoTitle,
      className = '',
    },
    ref,
  ) {
    console.log('rendering info panel item with props', {
      image,
      caption,
      imageVariant,
      backgroundPosition,
      title,
      text,
      keyInfo,
      actions,
      keyInfoTitle,
      className,
    })
    const intl = useTranslations()
    const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)

    const { url: imageUrl } = resolveImage({
      image,
      aspectRatio: mapSanityImageRatio('16:9'),
      grid: 'full',
      isLargerDisplays,
      useFitMax: true,
    })

    const keyFiguresElement = (
      <div
        className={twMerge(
          imageVariant === 'backgroundImage' && 'z-11 row-start-2 row-end-2',
          imageVariant === 'backgroundImage' &&
            !isLargerDisplays &&
            'px-layout-sm',
          imageVariant === 'bannerImage' &&
            'col-span-1 row-start-2 row-end-2 max-lg:px-layout-sm',
          imageVariant === 'sideImage' &&
            'order-2 w-full max-w-full lg:order-1 lg:pt-14',
        )}
      >
        <div className='sr-only'>
          {keyInfoTitle ? keyInfoTitle : intl('keyFigures')}
        </div>
        <ul className={`flex flex-wrap gap-x-10 gap-y-6 max-lg:mt-6`}>
          {keyInfo?.map(item => {
            return (
              <li key={item?.id} className='text-balance'>
                <div className='font-semibold text-md'>{item?.title}</div>
                <div className='font-semibold text-lg'>{item?.keyFigure}</div>
                <div className='text-base'>{item?.explanation}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )

    const getGridTemplateColumns = () => {
      if (imageVariant === 'sideImage') {
        return 'w-full max-w-full lg:grid-cols-[60%_40%] lg:grid-rows-[auto_auto]'
      }
      return 'lg:grid-cols-2 lg:grid-rows-[auto_auto]'
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          `relative flex flex-col gap-x-12 gap-y-6 pb-page-content lg:grid ${getGridTemplateColumns()} l`,
          imageVariant === 'sideImage' &&
            `items-start gap-12 px-layout-sm lg:px-20`,
          imageVariant === 'backgroundImage' && 'h-full bg-cover',
          imageVariant === 'backgroundImage' &&
            isLargerDisplays &&
            'px-layout-sm lg:px-20',
          imageVariant === 'bannerImage' && 'overflow-hidden',
          className,
        )}
        {...(imageVariant === 'backgroundImage' &&
          isLargerDisplays && {
            style: {
              backgroundImage: `url(${imageUrl})`,
            },
          })}
      >
        {image?.asset &&
          (imageVariant !== 'backgroundImage' ||
            (imageVariant === 'backgroundImage' && !isLargerDisplays)) && (
            <Image
              grid='sm'
              aria-hidden
              image={image}
              caption={caption}
              fill
              aspectRatio={imageVariant === 'sideImage' ? '2:1' : '10:3'}
              figureClassName={twMerge(
                caption &&
                  imageVariant === 'bannerImage' &&
                  'col-span-2 row-span-1 flex h-auto min-w-0 flex-col',
              )}
              className={twMerge(
                'relative h-full w-full',
                ((!caption && imageVariant === 'bannerImage') ||
                  imageVariant === 'backgroundImage') &&
                  'min-w-0 lg:col-span-2 lg:row-span-1',
                imageVariant === 'sideImage' &&
                  'mt-10 aspect-4/3 lg:aspect-video',
                imageVariant === 'bannerImage' && 'aspect-4/3 lg:aspect-10/3',
                imageVariant === 'backgroundImage' && 'max-lg:aspect-4/3',
              )}
              imageClassName={twMerge(
                imageVariant === 'sideImage' && 'rounded-md',
                backgroundPosition &&
                  getObjectPositionForImage(backgroundPosition),
              )}
              figCaptionClassName='px-layout-sm lg:px-20'
            />
          )}
        {imageVariant === 'sideImage' &&
          keyInfo &&
          keyInfo?.length > 0 &&
          keyFiguresElement}
        <div
          className={twMerge(
            'flex max-w-text flex-col',
            imageVariant === 'backgroundImage' &&
              'z-10 row-start-1 row-end-1 pt-6 lg:pt-14',
            imageVariant !== 'backgroundImage' && 'row-start-2 row-end-2',
            imageVariant === 'sideImage' &&
              'order-1 col-span-full lg:order-2 lg:col-span-1',
            imageVariant !== 'sideImage' &&
              keyInfo &&
              keyInfo?.length > 0 &&
              'col-span-1',
            (imageVariant === 'bannerImage' ||
              (imageVariant === 'backgroundImage' && !isLargerDisplays)) &&
              'px-layout-sm lg:px-20',
          )}
        >
          {title && (
            <Blocks
              value={title}
              variant='h3'
              blockClassName='text-lg lg:text-lg'
            />
          )}
          {text && <Blocks group='paragraph' variant='small' value={text} />}
          {actions &&
            actions.length > 0 &&
            actions.map(action => {
              const url = getUrlFromAction(action)
              return (
                <ResourceLink
                  key={action.id}
                  href={url}
                  {...(action.link?.lang && {
                    hrefLang: getLocaleFromName(action.link?.lang),
                  })}
                  file={{
                    ...action?.file,
                    label: action?.label,
                  }}
                  type={action.type}
                  variant='fit'
                  className='mt-2'
                  label={action?.label}
                />
              )
            })}
        </div>
        {imageVariant !== 'sideImage' &&
          keyInfo &&
          keyInfo?.length > 0 &&
          keyFiguresElement}
      </div>
    )
  },
)

export default TabsInfoPanelItem
