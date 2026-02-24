'use client'
import type { PortableTextBlock } from '@portabletext/types'
import type { HTMLAttributes, ReactNode } from 'react'
import type { ImageRatioKeys } from '@/core/Image/Image'
import { Picture } from '@/core/Picture/Picture'
import { Typography } from '@/core/Typography'
import { twMerge } from '@/lib/twMerge/twMerge'
import Blocks from '@/portableText/Blocks'
import type { ImageWithCaptionData } from '../../types/index'
import MagazineTagBar from '../MagazineTags/MagazineTagBar'
import type { HeroData } from './HeroBlock'

type DefaultHeroProps = {
  title?: PortableTextBlock[] | string
  /**Override title wrapper classnames */
  titleClassName?: string
  /**Override figure classnames if caption/attribution */
  figureClassName?: string
  /**Override figcaption classnames */
  figCaptionClassName?: string
  /**Override image wrapper classnames */
  imageWrapperClassName?: string
  /**Override image classnames */
  imageClassName?: string
  /* For news published information */
  subTitle?: ReactNode
  figure?: ImageWithCaptionData
  isBigTitle?: boolean
  /**bg-<colorkey> */
  background?: string
  bigTitle?: PortableTextBlock[]
  ratio?: ImageRatioKeys
} & Omit<HeroData, 'background'> &
  HTMLAttributes<HTMLElement>

export const DefaultHero = ({
  title,
  subTitle,
  titleClassName = '',
  background,
  figure,
  className = '',
  magazineTags,
  imageWrapperClassName = '',
  figCaptionClassName = '',
  imageClassName = '',
  ratio = '2:1',
}: DefaultHeroProps) => {
  console.log('title', title)
  //find variant in title
  const px = true ? 'px-layout-sm' : 'px-layout-sm lg:px-layout-md'
  const isPlainTitle =
    title && (title === 'string' || typeof title === 'string')
  const isColorBg = background && background !== 'bg-white-100'

  return (
    <div className={twMerge(className, `relative h-full w-full pb-4 lg:pb-6`)}>
      <div>
        <div
          className={twMerge(
            `pt-10 lg:pt-16 ${isColorBg ? `${background} pb-news-banner-vertical` : ''}`,
            px,
            titleClassName,
          )}
        >
          {title &&
            (isPlainTitle ? (
              <Typography group='heading' variant='h1' id='mainTitle'>
                {title}
              </Typography>
            ) : (
              <div>
                <Blocks
                  id='mainTitle'
                  value={title}
                  group='heading'
                  variant='h1'
                />
              </div>
            ))}
          {subTitle && subTitle}
        </div>
      </div>
      {figure && (
        <div
          className={`${isColorBg ? 'lg:-mt-news-banner-vertical' : ''} lg:px-layout-md`}
        >
          <Picture
            image={figure.image}
            desktopAspectRatio={ratio}
            figCaptionClassName={figCaptionClassName}
            caption={figure?.caption}
            attribution={figure?.attribution}
            figureClassName={twMerge(`w-full`, imageWrapperClassName)}
            className={imageClassName}
            withLayoutPx={false}
          />
        </div>
      )}
      {magazineTags && magazineTags?.length > 0 && (
        <MagazineTagBar tags={magazineTags} />
      )}
    </div>
  )
}
