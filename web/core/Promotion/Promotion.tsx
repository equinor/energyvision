import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import { BaseLink, type BaseLinkProps } from '@/core/Link'
import { getArrowElement } from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import type { GridColumnVariant } from '@/lib/helpers/getCommonUtilities'
import Blocks from '@/portableText/Blocks'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import type { ImageWithAlt } from '../../types'

export type PromotionVariant = 'externalLink' | 'default'
export type PromotionLayoutDirection = 'col' | 'row'

export type PromotionProps = {
  variant?: PromotionVariant
  background?: ColorKeys
  image: ImageWithAlt
  title: string | PortableTextBlock[]
  layoutDirection?: PromotionLayoutDirection
  gridColumns?: GridColumnVariant
} & BaseLinkProps

export const Promotion = forwardRef<HTMLAnchorElement, PromotionProps>(
  function Promotion(
    {
      background,
      title,
      image,
      href,
      className = '',
      locale,
      variant = 'default',
      gridColumns,
      layoutDirection = 'col',
    },
    ref,
  ) {
    const titleClassNames = 'group-hover:underline'

    const getTitleElement = () => {
      if (title && (title === 'string' || typeof title === 'string')) {
        return (
          <Typography as='p' variant='h6' className={titleClassNames}>
            {title}
          </Typography>
        )
      }
      if (title && Array.isArray(title)) {
        return (
          <Blocks
            as='p'
            variant='h6'
            className={titleClassNames}
            value={title}
          />
        )
      }
      return null
    }

    const layoutDirectionImageClassNames: Record<
      PromotionLayoutDirection,
      string
    > = {
      col: `aspect-video w-full h-auto`,
      row: `h-full w-auto ${gridColumns && gridColumns === '2' ? 'aspect-[1.08]' : 'aspect-4/5'}`,
    }

    return (
      <BaseLink
        ref={ref}
        type={variant === 'externalLink' ? 'externalUrl' : 'internalUrl'}
        href={href}
        locale={locale}
        prefetch={false}
        className={twMerge(
          `group h-full w-full rounded-card ${colorKeyToUtilityMap[background ?? 'gray-20'].background} grid ${
            layoutDirection === 'col'
              ? 'grid-cols-1 grid-rows-[65%_35%]'
              : `${gridColumns && gridColumns === '2' ? 'grid-cols-[30%_70%]' : 'grid-cols-[25%_75%]'} grid-rows-1`
          }focus:outline-none focus-visible:envis-outline dark:focus-visible:envis-outline-invert`,
          className,
        )}
      >
        {image && (
          <Image
            grid='lg'
            image={image}
            fill
            className={`h-full w-auto ${layoutDirectionImageClassNames[layoutDirection]}`}
            aspectRatio={layoutDirection === 'col' ? '16:9' : '4:5'}
            imageClassName={`${layoutDirection !== 'col' ? 'rounded-s-card' : 'rounded-t-card'}`}
          />
        )}
        <div
          className={`relative w-full ${layoutDirection === 'col' ? 'px-6 py-8' : 'py-4 pr-3 pl-4'} flex max-w-prose flex-col flex-wrap justify-center overflow-clip`}
        >
          {getTitleElement()}
          <div className='absolute right-3.5 bottom-3.5'>
            {getArrowElement(
              variant === 'externalLink' ? 'externalUrl' : 'internalUrl',
            )}
          </div>
        </div>
      </BaseLink>
    )
  },
)
