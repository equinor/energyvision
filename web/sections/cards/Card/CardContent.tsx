import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { ArrowRight } from '../../../icons'
import type { Variants } from './Card'

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
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent(
    {
      variant = 'primary',
      className = '',
      iconClassName = '',
      noArrow = false,
      children,
    },
    ref,
  ) {
    const commonStyling = `pt-6 md:pt-8 pb-6 px-6`

    const variantClassNames = {
      primary: `${commonStyling} flex-col items-start`,
      secondary: `${commonStyling} flex-col items-start`,
      compact: `pb-4 pt-2`,
      single: `${commonStyling} px-10 flex-col items-start`,
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          `flex h-full gap-4 md:gap-6 ${variantClassNames[variant]}`,
          className,
        )}
      >
        <div className='max-w-prose grow'>{children}</div>
        {!noArrow && (
          <div
            className={`flex items-end justify-end self-end p-1 ${variant === 'compact' ? 'max-xl:hidden' : ''}`}
          >
            <ArrowRight
              className={twMerge(
                `mr-2 size-arrow-right text-energy-red-100 transition-all duration-300 group-hover/card:translate-x-2 dark:text-white-100`,
                iconClassName,
              )}
            />
          </div>
        )}
      </div>
    )
  },
)
