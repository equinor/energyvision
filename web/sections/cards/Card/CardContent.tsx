import { ArrowRight } from '../../../icons'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type CardContentProps = {
  /** Variant to use
   * @default primary
   */
  variant?: 'primary' | 'secondary'
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
  const variantClassNames = {
    primary: `flex-col items-start border border-grey-10 border-t-0`,
    secondary: `flex-row items-center`,
  }
  const variantLinkClassNames = {
    primary: `self-end mt-auto`,
    secondary: ``,
  }
  const iconClassNames = twMerge(
    `
    mt-4
    max-h-8
    text-energy-red-100
    dark:text-white-100
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
        `
        basis-0
        grow
        pt-8
        pb-6
        px-6
        flex
        gap-6
      ${variantClassNames[variant]}
      `,
        className,
      )}
      {...rest}
    >
      {variant === 'secondary' ? (
        <>
          <div>{children}</div>
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
