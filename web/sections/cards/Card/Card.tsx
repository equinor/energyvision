import { forwardRef, HTMLAttributes } from 'react'
import { default as NextLink, LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'
import Image, { Ratios } from '../../../pageComponents/shared/SanityImage'
import { ImageWithAlt } from '../../../types/types'

export type CardProps = {
  /** Variant to use
   * @default primary
   */
  variant?: 'primary' | 'secondary' | 'compact'
  /** image */
  image?: ImageWithAlt
  /** Override background image styling */
  imageClassName?: string
} & HTMLAttributes<HTMLAnchorElement> &
  LinkProps

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
  { variant = 'primary', href, className = '', imageClassName = '', children, image, ...rest },
  ref,
) {
  const commonStyling = `
  flex 
  flex-col 
  shadow-card 
  rounded-sm 
  active:shadow-card-interact
  min-w-[220px]
  md:max-w-[400px]`

  const variantClassNames = {
    primary: `${commonStyling}`,
    secondary: `${commonStyling} rounded-md overflow-hidden`,
    compact: `h-full flex gap-4 min-w-[200px] xl:max-w-[300px] 3xl:max-w-[400px]`,
  }
  const variantAspectRatio = {
    primary: Ratios.NINE_TO_SIXTEEN,
    secondary: Ratios.FIVE_TO_FOUR,
    compact: Ratios.NINE_TO_SIXTEEN,
  }
  const imageRatio = {
    primary: 'aspect-video',
    secondary: 'aspect-5/4',
    compact: '',
  }
  const imageVariantClassNames = {
    primary: ``,
    secondary: `rounded-t-md`,
    compact: 'w-[35%] h-auto',
  }

  return (
    <NextLink
      ref={ref}
      href={href}
      prefetch={false}
      className={twMerge(
        `group/card
        ${variantClassNames[variant]}
      bg-white-100
      text-slate-80
      focus:outline-none
      focus-visible:envis-outline
      dark:text-white-100
      dark:focus-visible:envis-outline-invert
      `,
        className,
      )}
      {...rest}
    >
      {image && (
        <div
          className={twMerge(
            `relative
          ${imageVariantClassNames[variant]}
          ${imageRatio[variant]}
          max-md:max-h-[212px]
          `,
            imageClassName,
          )}
        >
          <Image
            image={image}
            fill
            maxWidth={600}
            aspectRatio={variantAspectRatio[variant]}
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </div>
      )}
      {children}
    </NextLink>
  )
})
