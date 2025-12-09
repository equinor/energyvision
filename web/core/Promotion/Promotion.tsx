import { BaseLink, type BaseLinkProps } from '@core/Link'
import { getArrowElement } from '@core/Link/ResourceLink'
import Image, { getPxLgSizes } from '@core/SanityImage/SanityImage'
import { Heading, Typography } from '@core/Typography'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import type { GridColumnVariant } from '../../common/helpers/getCommonUtillities'
import { type ColorKeys, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
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

export const Promotion = forwardRef<HTMLAnchorElement, PromotionProps>(function Promotion(
  { background, title, image, href, className = '', locale, variant = 'default', gridColumns, layoutDirection = 'col' },
  ref,
) {
  const titleClassNames = 'group-hover:underline'
  const getTitleElement = () => {
    if (title && (title === 'string' || typeof title === 'string')) {
      return (
        <Typography as="p" variant="h6" className={titleClassNames}>
          {title}
        </Typography>
      )
    }
    if (title && Array.isArray(title)) {
      return <Heading as="p" variant="h6" className={titleClassNames} value={title} />
    }
    return null
  }

  const layoutDirectionImageClassNames: Record<PromotionLayoutDirection, string> = {
    col: `aspect-video w-full h-auto`,
    row: `h-full w-auto ${gridColumns && gridColumns === '2' ? 'aspect-[1.08]' : 'aspect-[4/5]'}`,
  }

  /**
   *         flex
        ${layoutDirection === 'col' ? 'flex-col' : 'flex-row'}
   */
  return (
    <BaseLink
      ref={ref}
      type={variant === 'externalLink' ? 'externalUrl' : 'internalUrl'}
      href={href}
      locale={locale}
      prefetch={false}
      className={twMerge(
        `group
        w-full
        h-full
        rounded-[13px]
        ${colorKeyToUtilityMap[background ?? 'gray-20'].background}
        grid
        ${
          layoutDirection === 'col'
            ? 'grid-cols-1 grid-rows-[65%_35%]'
            : `${gridColumns && gridColumns === '2' ? 'grid-cols-[30%_70%]' : 'grid-cols-[25%_75%]'} grid-rows-1`
        }
        focus:outline-none
        focus-visible:envis-outline
        dark:focus-visible:envis-outline-invert
      `,
        className,
      )}
    >
      <div className={`relative h-full w-auto ${layoutDirectionImageClassNames[layoutDirection]}`}>
        {image && (
          <Image
            sizes={getPxLgSizes()}
            image={image}
            fill
            aspectRatio={layoutDirection === 'col' ? '16:9' : '4:5'}
            className={`${layoutDirection !== 'col' ? 'rounded-s-[13px]' : 'rounded-t-[13px]'}`}
          />
        )}
      </div>
      <div
        className={`w-full 
        relative 
        ${layoutDirection === 'col' ? 'px-6 py-8' : 'pl-4 pr-3 py-4'}
        flex 
        flex-col 
        flex-wrap
        overflow-clip
        justify-center 
        max-w-prose`}
      >
        {getTitleElement()}
        <div className="absolute right-3.5 bottom-3.5">
          {getArrowElement(variant === 'externalLink' ? 'externalUrl' : 'internalUrl')}
        </div>
      </div>
    </BaseLink>
  )
})
