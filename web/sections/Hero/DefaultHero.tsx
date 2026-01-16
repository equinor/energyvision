import type { PortableTextBlock } from '@portabletext/types'
import type { HTMLAttributes, ReactNode } from 'react'
import { Image, type ImageRatioKeys } from '@/core/Image/Image'
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
  isBigTitle,
  bigTitle,
  className = '',
  magazineTags,
  imageWrapperClassName = '',
  figCaptionClassName = '',
  imageClassName = '',
  ratio = '2:1',
}: DefaultHeroProps) => {
  const px =
    isBigTitle && bigTitle ? 'px-layout-sm' : 'px-layout-sm lg:px-layout-md'
  const isPlainTitle =
    title && (title === 'string' || typeof title === 'string')

  return (
    <div className={twMerge(className, `relative h-full w-full`)}>
      {background && (
        <div
          className={`-z-1 absolute inset-0 w-full lg:mb-news-banner-vertical ${background}`}
        />
      )}
      <div className={twMerge(`pt-10 lg:pt-20`, px, titleClassName)}>
        {title &&
          (isPlainTitle ? (
            <Typography variant='h1' id='mainTitle'>
              {title}
            </Typography>
          ) : isBigTitle && bigTitle ? (
            <>
              <div className='pr-16'>
                <Blocks id='mainTitle' value={title} as='h1' variant='xl' />
              </div>
              <div>
                <Blocks value={bigTitle} as='h2' variant='3xl' />
              </div>
            </>
          ) : (
            <div>
              <Blocks id='mainTitle' value={title} variant='h1' />
            </div>
          ))}
      </div>
      {subTitle && subTitle}
      {figure && (
        <Image
          grid='sm'
          loading='eager'
          className={twMerge(`lg:px-layout-md`, imageWrapperClassName)}
          aspectRatio={ratio}
          image={figure.image}
          caption={figure.caption}
          attribution={figure.attribution}
          imageClassName={twMerge(``, imageClassName)}
          figCaptionClassName={figCaptionClassName}
        />
      )}
      {magazineTags && magazineTags?.length > 0 && (
        <MagazineTagBar tags={magazineTags} />
      )}
    </div>
  )
}
