import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import BaseLink, { type BaseLinkProps } from '@/core/Link/BaseLink'
import { Image, type ImageRatioKeys } from '../../../core/Image/Image'
import type { ImageWithAlt } from '../../../types/index'

export type Variants = 'primary' | 'secondary' | 'compact' | 'single'
export type CardProps = {
  /** Variant to use
   * @default primary
   */
  variant?: Variants
  /** image */
  image?: ImageWithAlt
  /** Override background image styling */
  imageClassName?: string
  imageWrapperClassName?: string
  /* grey card background as long as not on colored background */
  onColorBg?: boolean
} & BaseLinkProps

/**
 * Common Card component.
 * Entire card is clickable as link. Controls bg color, bg image and rounded on card
 * Remember to wrap in ul and li if in a list.
 * Variants:
 * primary - used for news,magazine promotions
 * secondary - used for promo tile
 * For people, see own own component PeopleCard
 * @summary Card component with variants
 * @example
 * */
export const Card = forwardRef<HTMLAnchorElement, CardProps>(function Card(
  {
    variant = 'primary',
    href,
    className = '',
    imageClassName = '',
    imageWrapperClassName = '',
    children,
    image,
    onColorBg = false,
  },
  ref,
) {
  const commonStyling = `
  grid
  grid-cols-1 
  grid-rows-[35%_65%]
  flex-col
  gap-0
  rounded-card 
  w-full
  h-full
  `

  const variantClassNames: Record<Variants, string> = {
    primary: `${commonStyling}`,
    secondary: `${commonStyling}`,
    compact: `w-full h-full rounded-card flex gap-4`,
    single: `grid grid-cols-[40%_auto] min-h-[450px] rounded-card`,
  }
  const variantAspectRatio: Record<Variants, ImageRatioKeys> = {
    primary: '16:9',
    secondary: '4:3',
    compact: '5:4',
    single: '5:4',
  }
  const imageRatio: Record<Variants, string> = {
    primary: 'aspect-video',
    secondary: 'aspect-4/3',
    compact: 'aspect-5/4',
    single: '',
  }
  const imageVariantClassNames: Record<Variants, string> = {
    primary: `rounded-t-card *:rounded-t-card`,
    secondary: `rounded-t-card *:rounded-t-card`,
    compact: 'rounded-s-card w-[25vw] h-full *:rounded-s-card',
    single: 'w-full h-full',
  }

  return (
    <BaseLink
      ref={ref}
      href={href}
      prefetch={false}
      className={twMerge(
        `group/card ${onColorBg ? 'bg-white-100' : 'bg-gray-20'} ${variantClassNames[variant]}`,
        className,
      )}
    >
      {image?.asset && (
        <Image
          image={image}
          fill
          grid='xs'
          aspectRatio={variantAspectRatio[variant]}
          className={twMerge(
            `${imageVariantClassNames[variant]} ${imageRatio[variant]}`,
            imageWrapperClassName,
          )}
          imageClassName={twMerge(
            `w-full ${imageVariantClassNames[variant]} ${imageRatio[variant]} `,
            imageClassName,
          )}
        />
      )}
      {children}
    </BaseLink>
  )
})
