import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Image, { getSmallerThanPxLgSizes, ImageRatioKeys } from '../../../core/SanityImage/SanityImage'
import { ImageWithAlt } from '../../../types/index'
import envisTwMerge from '../../../twMerge'
import { BaseLink, BaseLinkProps } from '@/core/Link'

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
  { variant = 'primary', href, className = '', imageClassName = '', children, locale, image, ...rest },
  ref,
) {
  const commonStyling = `
  flex 
  flex-col
  gap-0
  shadow-card 
  rounded-xs 
  active:shadow-card-interact
  w-full
  h-full
  `

  const variantClassNames: Record<Variants, string> = {
    primary: `${commonStyling}`,
    secondary: `${commonStyling}`,
    compact: `w-full h-full rounded-xs flex gap-4`,
    single: `grid grid-cols-[40%_1fr] min-h-[450px] shadow-card rounded-xs active:shadow-card-interact`,
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
    primary: `rounded-t-sm *:rounded-t-sm`,
    secondary: `rounded-t-sm *:rounded-t-sm`,
    compact: 'rounded-xs w-[25vw] h-auto *:rounded-xs',
    single: 'w-auto h-full',
  }

  return (
    <BaseLink
      ref={ref}
      href={href}
      hrefLang={locale}
      prefetch={false}
      className={twMerge(
        `group/card
        bg-white-100
        text-slate-80
        dark:text-white-100
        focus:outline-hidden
        focus-visible:envis-outline
        dark:focus-visible:envis-outline-invert
        ${variantClassNames[variant]}
      `,
        className,
      )}
      {...rest}
    >
      {image && image.asset && (
        <div
          className={envisTwMerge(
            `relative
            w-full
          ${imageVariantClassNames[variant]}
          ${imageRatio[variant]}
          `,
            imageClassName,
          )}
        >
          <Image
            image={image}
            fill
            maxWidth={600}
            aspectRatio={variantAspectRatio[variant]}
            sizes={getSmallerThanPxLgSizes()}
          />
        </div>
      )}
      {children}
    </BaseLink>
  )
})
