import type { PortableTextBlock } from '@portabletext/types'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  getObjectPositionForImage,
  Image,
  type ObjectPositions,
} from '@/core/Image/Image'
import ResourceLink from '@/core/Link/ResourceLink'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import { getLocaleFromName } from '@/sanity/helpers/localization'
import type { ImageWithAlt, LinkData } from '../../types'
import type { InfoPanelImageVariant, InfoPanelKeyInfo } from './TabsBlock.types'

type TabsInfoPanelItemProps = {
  theme?: number
  image?: ImageWithAlt
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

    const keyFiguresElement = (
      <div
        className={`${imageVariant === 'backgroundImage' ? 'z-11 row-start-2 row-end-2' : ''} ${
          imageVariant === 'bannerImage'
            ? 'col-span-1 row-start-2 row-end-2'
            : ''
        } ${imageVariant === 'sideImage' ? 'order-2 lg:order-1 lg:pt-14' : ''}`}
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
          `relative flex flex-col gap-12 lg:grid lg:grid-cols-[60%_40%] lg:grid-rows-[auto_auto] ${
            imageVariant === 'sideImage' ? `items-start gap-12` : ''
          }`,
          className,
        )}
      >
        {image?.asset && (
          <div
            className={`h-auto w-full ${
              imageVariant === 'bannerImage'
                ? 'relative col-span-full row-span-1 aspect-4/3 lg:aspect-21/9'
                : ''
            } ${imageVariant === 'backgroundImage' ? 'absolute inset-0 z-0 col-span-full row-span-full' : ''} ${
              imageVariant === 'sideImage'
                ? 'relative aspect-4/3 lg:aspect-2/1'
                : ''
            }`}
          >
            <Image
              grid='sm'
              aria-hidden
              image={image}
              fill
              className={`h-auto w-full ${
                imageVariant === 'bannerImage'
                  ? 'relative col-span-full row-span-1 aspect-4/3 lg:aspect-21/9'
                  : ''
              } ${imageVariant === 'backgroundImage' ? 'absolute inset-0 z-0 col-span-full row-span-full' : ''} ${
                imageVariant === 'sideImage'
                  ? 'relative aspect-4/3 lg:aspect-2/1'
                  : ''
              }`}
              imageClassName={`${imageVariant === 'sideImage' ? 'rounded-md' : ''} ${
                backgroundPosition
                  ? getObjectPositionForImage(backgroundPosition)
                  : ''
              }`}
            />
          </div>
        )}
        {imageVariant === 'sideImage' &&
          keyInfo &&
          keyInfo?.length > 0 &&
          keyFiguresElement}
        <div
          className={`flex flex-col ${
            imageVariant === 'backgroundImage'
              ? 'z-10 row-start-1 row-end-1 pt-14'
              : `row-start-2 row-end-2`
          } ${
            imageVariant === 'sideImage'
              ? 'order-1 col-span-full lg:order-2'
              : `${keyInfo && keyInfo?.length > 0 ? 'col-span-1' : ''}`
          }`}
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
