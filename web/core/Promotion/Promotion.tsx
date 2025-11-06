import { ImageWithAlt } from '../../types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { ColorKeys, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import Image, { getPxLgSizes } from '@core/SanityImage/SanityImage'
import { PortableTextBlock } from '@portabletext/types'
import { Heading, Typography } from '@core/Typography'
import { getArrowElement } from '@core/Link/ResourceLink'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import { BaseLink, BaseLinkProps } from '@core/Link'
import { GridColumnVariant } from '../../common/helpers/getCommonUtillities'

export type PromotionVariant = 'externalLink' | 'default'
export type PromotionLayoutDirection = 'col' | 'row'

export type PromotionProps = {
  variant?: PromotionVariant
  background?: ColorKeys
  image: ImageWithAlt
  title: string | PortableTextBlock[]
  ingress?: PortableTextBlock[]
  layoutDirection?: PromotionLayoutDirection
  gridColumns?: GridColumnVariant
} & BaseLinkProps

export const Promotion = forwardRef<HTMLAnchorElement, PromotionProps>(function Promotion(
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
  },
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
    col: `aspect-video w-full`,
    row: `${gridColumns && gridColumns === '2' ? 'aspect-[1.08]' : 'aspect-[4/5]'}`,
  }
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
        flex
        ${layoutDirection === 'col' ? 'flex-col' : 'flex-row'}
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
            className={`${layoutDirection !== 'col' ? 'rounded-[13px]' : 'rounded-t-[13px]'}`}
          />
        )}
      </div>
      <div
        className={`w-full 
        relative 
        ${layoutDirection === 'col' ? 'px-6 py-8' : 'pl-4 pr-3 py-12'}
        flex 
        flex-col 
        justify-center 
        max-w-prose`}
      >
        {getTitleElement()}
        {ingress && <IngressText value={ingress} clampLines={3} className={`text-sm py-2`} />}
        <div className="absolute right-2.5 bottom-2.5">
          {getArrowElement(variant === 'externalLink' ? 'externalUrl' : 'internalUrl')}
        </div>
      </div>
    </BaseLink>
  )
})
