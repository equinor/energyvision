import { forwardRef, HTMLAttributes } from 'react'
import { default as NextLink, LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'

export type CardProps = {
  /** Variant to use
   * @default primary
   */
  variant?: 'primary' | 'secondary'
  /** The url for the background image */
  imageUrl?: string
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
  { variant = 'primary', href, className = '', imageClassName = '', children, imageUrl, ...rest },
  ref,
) {
  const variantClassNames = {
    primary: ``,
    secondary: `rounded-md overflow-hidden`,
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
      border
      border-autumn-storm-50
      rounded-sm
      active:box-shadow-crisp-interact
      active:shadow-white-100-interact
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
      {imageUrl && (
        <div
          className={twMerge(
            `w-full
            h-auto
            bg-no-repeat
            bg-center
            bg-cover
            ${imageVariantClassNames[variant]}
            ${imageRatio[variant]}
            max-h-[200px]
            lg:max-h-[100%]
            `,
            imageClassName,
          )}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      )}
      {children}
    </NextLink>
  )
})
