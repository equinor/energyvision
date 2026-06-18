import type { PortableTextBlock } from '@portabletext/types'
import type { HTMLAttributes, ReactNode } from 'react'
import type { Figure, ImageRatioKeys } from '@/core/Image/imageUtilities'
import { Picture } from '@/core/Picture/Picture'
import { Typography } from '@/core/Typography'
import { twMerge } from '@/lib/twMerge/twMerge'
import Blocks from '@/portableText/Blocks'
import MagazineTagBar, {
  type MagazineTag,
} from '../MagazineTags/MagazineTagBar'

export type DefaultHeroProps = {
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
  figure?: Figure
  isBigTitle?: boolean
  /**bg-<colorkey> */
  background?: string
  bigTitle?: PortableTextBlock[]
  ratio?: ImageRatioKeys
  /* Magazine promoted tagline */
  magazineTags?: MagazineTag[]
} & HTMLAttributes<HTMLElement>

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
  //find variant in title
  const px = 'px-layout-sm lg:px-layout-md'
  const isPlainTitle =
    title && (title === 'string' || typeof title === 'string')
  const isColorBg = background && background !== 'bg-white-100'

  return (
    <div className={twMerge(className, `pb-4 lg:pb-6`)}>
      <div
        className={twMerge(
          `pt-10 lg:pt-16 ${isColorBg ? `${background} pb-news-banner-vertical` : ''}`,
          titleClassName,
        )}
      >
        <div className={twMerge('mx-auto max-w-content', px)}>
          {title &&
            (isPlainTitle ? (
              <Typography
                group='heading'
                variant='h1'
                id='mainTitle'
                tabIndex={-1}
              >
                {title}
              </Typography>
            ) : (
              <Blocks
                id='mainTitle'
                value={title as PortableTextBlock[]}
                group='heading'
                variant='h1'
                tabIndex={-1}
              />
            ))}
          {subTitle && subTitle}
        </div>
      </div>
      <div className='mx-auto max-w-content'>
        {figure && (
          <div
            className={twMerge(
              `lg:px-layout-sm`,
              isColorBg && 'lg:-mt-news-banner-vertical',
            )}
          >
            <Picture
              image={figure.image}
              desktopAspectRatio={ratio}
              figCaptionClassName={twMerge('px-layout-sm', figCaptionClassName)}
              caption={figure?.caption}
              attribution={figure?.attribution}
              figureClassName={twMerge(`w-full`, imageWrapperClassName)}
              className={twMerge('', imageClassName)}
              withLayoutPx={false}
            />
          </div>
        )}
        {magazineTags && magazineTags?.length > 0 && (
          <MagazineTagBar tags={magazineTags} />
        )}
      </div>
    </div>
  )
}
