import { ArrowRight } from '../../../icons'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Variants } from './Card'

export type CardContentProps = {
  /** Variant to use
   * @default primary
   */
  variant?: Variants
  /** Overriding styles for the icon  */
  iconClassName?: string
  /** Take care of the arrow yourself */
  noArrow?: boolean
} & HTMLAttributes<HTMLDivElement>

/**
 * Card Contant wrapper to structure component.Controls the arrow type
 * Variants:
 * primary - used for news,magazine promotions
 * secondary - used for promo tile
 * For people, see own own component PeopleCard
 * @summary Card Content wrapper for structure
 * @example
 * */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { variant = 'primary', className = '', iconClassName = '', noArrow = false, children, ...rest },
  ref,
) {
  const commonStyling = `pt-6 md:pt-8 pb-6 px-6`
  const variantClassNames = {
    primary: `${commonStyling} flex-col items-start`,
    secondary: `${commonStyling} pb-12 lg:pb-16 flex-row items-center justify-between items-center`,
    compact: `pb-4 pt-2`,
    single: `${commonStyling} px-10 flex-col items-start`,
  }
  const variantLinkClassNames = {
    primary: `self-end mt-auto max-lg:hidden`,
    secondary: `max-lg:hidden`,
    compact: `max-xl:hidden`,
    single: 'self-end mt-auto max-lg:hidden',
  }
  const iconClassNames = twMerge(
    `size-arrow-right
    text-energy-red-100
    mr-2
    group-hover/card:translate-x-2
    transition-all
    duration-300
    ${variantLinkClassNames[variant]}
  `,
    iconClassName,
  )
  return (
    <div
      ref={ref}
      className={twMerge(
        `basis-0
        grow
        flex
        gap-4
        md:gap-6
      ${variantClassNames[variant]}
      `,
        className,
      )}
      {...rest}
    >
      {variant === 'secondary' || variant === 'single' ? (
        <>
          <div className={`${variant === 'single' ? 'pr-12 flex flex-col gap-12' : ''}`}>{children}</div>
          {!noArrow && <ArrowRight className={iconClassNames} />}
        </>
      ) : (
        <>
          {children}
          {!noArrow && <ArrowRight className={iconClassNames} />}
        </>
      )}
    </div>
  )
})
