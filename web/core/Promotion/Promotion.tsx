import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image, type ImageRatioKeys } from '@/core/Image/Image'
import { getArrowElement } from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import type { GridColumnVariant } from '@/lib/helpers/getCommonUtilities'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import type { ImageWithAlt } from '../../types'
import BaseLink, { type BaseLinkProps } from '../Link/BaseLink'

export type PromotionType = 'compact' | 'extended'
export type PromotionVariant = 'externalLink' | 'default'
export type PromotionLayoutDirection = 'col' | 'row'

export type PromotionProps = {
  /**
   * compact - only title with v2 promo options in studio
   * extended - title, ingress and date eyebrow, stacked layout. E.g. News promotion
   * @default compact
   */
  type?: PromotionType
  /** Internal(default) links or external
   * @defaul default
   */
  variant?: PromotionVariant
  /** Background on promotion card
   * @default gray-20
   */
  background?: ColorKeys
  image: ImageWithAlt
  /** Rendered as plain but accepts portable */
  title: string | PortableTextBlock[]
  /** Rendered as plain but accepts portable.
   * Combined type hides ingress on mobile
   */
  ingress?: PortableTextBlock[]
  /** about title element */
  eyebrow?: ReactNode
  /** Side by side or stacked layout
   * @default col
   */
  layoutDirection?: PromotionLayoutDirection
  /** Helper from parent grid columns to decide image aspect */
  gridColumns?: GridColumnVariant
  /** h2 or h3 if section title in parent block component */
  hasSectionTitle?: boolean
} & Omit<BaseLinkProps, 'type'>

export const Promotion = forwardRef<HTMLAnchorElement, PromotionProps>(
  function Promotion(
    {
      type = 'compact',
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
      eyebrow,
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

    const showArrow = type !== 'extended'
    const _layoutDirection = type === 'extended' ? 'col' : layoutDirection

    const paddingOnTypes: Record<PromotionType, string> = {
      compact: _layoutDirection === 'col' ? 'p-4' : 'py-4 pr-3 pl-4',
      extended: 'pt-6 md:pt-8 pb-6 px-6',
    }
    const layoutOnTypes: Record<PromotionType, string> = {
      compact:
        _layoutDirection === 'col'
          ? 'grid-cols-1 grid-rows-[16vh_auto]'
          : `min-h-[120px] grid-cols-[23vw_auto] md:grid-cols-[15vw_auto] lg:grid-cols-[10vw_auto] grid-rows-1`,
      extended: 'grid-cols-1 grid-rows-[16vh_auto]',
    }
    const lineClampOnTypes: Record<PromotionType, string> = {
      compact: layoutDirection === 'col' ? 'line-clamp-2' : 'line-clamp-3',
      extended: 'line-clamp-5',
    }

    return (
      <BaseLink
        ref={ref}
        type={variant === 'externalLink' ? 'externalUrl' : 'internalUrl'}
        href={href}
        locale={locale}
        prefetch={false}
        className={twMerge(
          `group h-full w-full rounded-card ${colorKeyToUtilityMap[background ?? 'gray-20'].background} grid ${layoutOnTypes[type]} focus-visible:envis-outline dark:focus-visible:envis-outline-invert focus:outline-none`,
          className,
        )}
      >
        {image && (
          <Image
            grid='lg'
            image={image}
            fill
            className={`${layoutDirectionImageClassNames[_layoutDirection]}`}
            aspectRatio={_layoutDirection === 'col' ? '16:9' : '4:3'}
            imageClassName={`${_layoutDirection !== 'col' ? 'rounded-s-card' : 'rounded-t-card'}`}
          />
        )}
        <div
          className={`h-full min-h-[8vh] w-full ${paddingOnTypes[type]} flex ${type === 'extended' ? 'items-start' : 'items-center'} `}
        >
          <div className={`max-w-prose grow`}>
            {eyebrow && eyebrow}
            {plainText && (
              <Typography
                as={hasSectionTitle ? 'h3' : 'h2'}
                variant={ingress ? 'h5' : 'h6'}
                className={`leading-tight group-hover:underline`}
              >
                {plainText}
              </Typography>
            )}
            {plainIngress && (
              <Typography
                group='card'
                variant='ingress'
                className={`pt-3 ${lineClampOnTypes[type]}`}
              >
                {plainIngress}
              </Typography>
            )}
          </div>

          {showArrow && (
            <div className='flex items-end justify-end self-end p-1'>
              {getArrowElement(
                variant === 'externalLink' ? 'externalUrl' : 'internalUrl',
              )}
            </div>
          )}
        </div>
      </BaseLink>
    )
  },
)
