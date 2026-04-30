import type { PortableTextBlock } from '@portabletext/types'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  getObjectPositionForImage,
  Image,
  mapSanityImageRatio,
  type ObjectPositions,
} from '@/core/Image/Image'
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
  image?: Image
  imageVariant?: InfoPanelImageVariant
  title?: PortableTextBlock[]
  text?: PortableTextBlock[]
  keyInfo?: InfoPanelKeyInfo[]
  backgroundPosition?: ObjectPositions
  action?: LinkData
  className?: string
  keyInfoTitle?: string
}

const TabsInfoPanelItem = forwardRef<HTMLDivElement, TabsInfoPanelItemProps>(
  function TabsInfoPanelItem(
    {
      image,
      imageVariant,
      backgroundPosition,
      title,
      text,
      keyInfo,
      action,
      keyInfoTitle,
      className = '',
    },
    ref,
  ) {
    const url = action ? getUrlFromAction(action) : undefined
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
          imageVariant === 'bannerImage' && 'col-span-1 row-start-2 row-end-2',
          imageVariant === 'sideImage' && 'order-2 lg:order-1 lg:pt-14',
        )}
      >
        <div className='sr-only'>
          {keyInfoTitle ? keyInfoTitle : intl('keyFigures')}
        </div>
        <div
          className={`gap-x-10 gap-y-6 ${
            imageVariant !== 'backgroundImage'
              ? `grid auto-rows-min ${keyInfo && keyInfo?.length % 2 ? 'grid-cols-1' : 'grid-cols-2'}`
              : 'flex flex-wrap'
          }`}
        >
          {keyInfo?.map(item => {
            return (
              <div key={item?.id} className='text-balance'>
                <div className='font-semibold text-md'>{item?.title}</div>
                <div className='font-semibold text-lg'>{item?.keyFigure}</div>
                <div className='text-base'>{item?.explanation}</div>
              </div>
            )
          })}
        </div>
      </div>
    )

    return (
      <div
        ref={ref}
        className={twMerge(
          `relative flex h-full w-full flex-col gap-12 pb-page-content lg:grid lg:grid-cols-[60%_40%] lg:grid-rows-[auto_auto]`,
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
              fill
              aspectRatio={imageVariant === 'sideImage' ? '2:1' : '10:3'}
              className={twMerge(
                'relative h-full w-full',
                (imageVariant === 'bannerImage' ||
                  imageVariant === 'backgroundImage') &&
                  'col-span-2 row-span-1 min-w-0',
                imageVariant === 'sideImage' && 'mt-10',
              )}
              imageClassName={twMerge(
                imageVariant === 'sideImage' && 'rounded-md',
                backgroundPosition &&
                  getObjectPositionForImage(backgroundPosition),
              )}
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
              'z-10 row-start-1 row-end-1 pt-14',
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
          {action && url && (
            <ResourceLink
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
            >
              {`${action?.label}`}
            </ResourceLink>
          )}
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
