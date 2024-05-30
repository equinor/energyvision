import { forwardRef, HTMLAttributes } from 'react'
import { default as NextLink, LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'
import Image, { Ratios } from '../../../pageComponents/shared/SanityImage'
import { ImageWithAlt } from '../../../types/types'

export type CardProps = {
  /** Variant to use
   * @default primary
   */
  variant?: 'primary' | 'secondary'
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
  const variantClassNames = {
    primary: ``,
    secondary: `rounded-md overflow-hidden`,
  }
  const variantAspectRatio = {
    primary: Ratios.NINE_TO_SIXTEEN,
    secondary: Ratios.FIVE_TO_FOUR,
  }
  const imageRatio = {
    primary: 'aspect-video',
    secondary: 'aspect-5/4',
  }
  const imageVariantClassNames = {
    primary: ``,
    secondary: `rounded-t-md`,
  }

  return (
    <NextLink
      ref={ref}
      href={href}
      prefetch={false}
      className={twMerge(
        `group/card 
      flex
      flex-col
      bg-white-100
      text-slate-80
      shadow-card
      rounded-sm
      active:shadow-card-interact
      focus:outline-none
      focus-visible:envis-outline
      dark:text-white-100
      dark:focus-visible:envis-outline-invert
      ${variantClassNames[variant]}
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
