import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import { BaseLink, type BaseLinkProps } from '@/core/Link'
import { getArrowElement } from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import type { GridColumnVariant } from '@/lib/helpers/getCommonUtilities'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import type { ImageWithAlt } from '../../types'

export type PromotionType = 'extended' | 'compact'
export type PromotionVariant = 'externalLink' | 'default'
export type PromotionLayoutDirection = 'col' | 'row'

export type PromotionProps = {
  /**
   * extended - with title, ingress and date eyebrow only col layout
   * compact - only title with v2 promo options
   */
  type?: PromotionType
  variant?: PromotionVariant
  background?: ColorKeys
  image: ImageWithAlt
  title: string | PortableTextBlock[]
  ingress?: PortableTextBlock[]
  layoutDirection?: PromotionLayoutDirection
  gridColumns?: GridColumnVariant
  hasSectionTitle?: boolean
} & BaseLinkProps

export const Promotion = forwardRef<HTMLAnchorElement, PromotionProps>(
  function Promotion(
    {
      background,
      title,
      ingress,
      image,
      href,
      className = '',
      locale,
      variant = 'default',
      gridColumns,
      layoutDirection = 'col',
      hasSectionTitle = false,
    },
    ref,
  ) {
    const plainText = Array.isArray(title)
      ? title
          .map(block => block.children.map(span => span.text).join(''))
          .join('\n')
          .replace(/\n/g, ' ')
      : title

    const plainIngress = ingress
      ?.map(block => block.children.map(span => span.text).join(''))
      .join('\n')
      .replace(/\n/g, ' ')

    const layoutDirectionImageClassNames: Record<
      PromotionLayoutDirection,
      string
    > = {
      col: `aspect-video w-full h-full`,
      row: `h-full w-full ${gridColumns && gridColumns === '2' ? '2xl:aspect-[1.08]' : '2xl:aspect-4/5'}`,
    }

    const titleClassNames = `group-hover:underline leading-tight ${
      layoutDirection === 'col' ? 'line-clamp-2' : 'line-clamp-3'
    }`

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
              : `min-h-[120px] grid-cols-[30%_70%] grid-rows-1`
          } focus-visible:envis-outline dark:focus-visible:envis-outline-invert focus:outline-none`,
          className,
        )}
      >
        {image && (
          <Image
            grid='lg'
            image={image}
            fill
            className={`${layoutDirectionImageClassNames[layoutDirection]}`}
            aspectRatio={layoutDirection === 'col' ? '16:9' : '4:5'}
            imageClassName={`${layoutDirection !== 'col' ? 'rounded-s-card' : 'rounded-t-card'}`}
          />
        )}
        <div
          className={`h-inherit w-inherit ${layoutDirection === 'col' ? 'p-4' : 'py-4 pr-3 pl-4'} flex items-center overflow-hidden`}
        >
          <div className='max-w-prose grow'>
            <Typography
              as={hasSectionTitle ? 'h3' : 'h2'}
              variant={ingress ? 'h5' : 'h6'}
              className={titleClassNames}
            >
              {plainText}
            </Typography>
            <Typography as='p' variant='h6' className={titleClassNames}>
              {ingress && plainIngress}
            </Typography>
          </div>

          <div className='flex items-end justify-end self-end p-1'>
            {getArrowElement(
              variant === 'externalLink' ? 'externalUrl' : 'internalUrl',
            )}
          </div>
        </div>
      </BaseLink>
    )
  },
)
