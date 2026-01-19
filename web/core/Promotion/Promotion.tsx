import { BaseLink, type BaseLinkProps } from '@core/Link'
import { getArrowElement } from '@core/Link/ResourceLink'
import Image, { getPxLgSizes } from '@core/SanityImage/SanityImage'
import { Typography } from '@core/Typography'
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
  const plainText = Array.isArray(title)
    ? title
        .map((block) => block.children.map((span) => span.text).join(''))
        .join('\n')
        .replace(/\n/g, ' ')
    : title

  const layoutDirectionImageClassNames: Record<PromotionLayoutDirection, string> = {
    col: `aspect-video w-full h-auto`,
    row: `h-full w-auto ${gridColumns && gridColumns === '2' ? '2xl:aspect-[1.08]' : '2xl:aspect-[4/5]'}`,
  }

  const titleClassNames = `group-hover:underline leading-tight ${
    layoutDirection === 'col' ? 'line-clamp-2' : 'line-clamp-3'
  }`

  return href ? (
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
            : 'min-h-[120px] grid-cols-[30%_70%] grid-rows-1'
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
        className={`
          w-inherit 
          h-inherit
        relative 
        ${layoutDirection === 'col' ? 'p-4' : 'pl-4 pr-3 py-4'}
        flex
        items-center
        overflow-hidden
        `}
      >
        <div className="grow max-w-prose ">
          <Typography as="p" variant="h6" className={titleClassNames}>
            {plainText}
          </Typography>
        </div>

        <div className="flex p-1 self-end justify-end items-end">
          {getArrowElement(variant === 'externalLink' ? 'externalUrl' : 'internalUrl')}
        </div>
      </div>
    </BaseLink>
  ) : null
})
