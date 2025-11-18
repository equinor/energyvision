import { type HTMLAttributes, forwardRef } from 'react'
import { getColorConfigForTableTheme } from './TableTheme'
import { InnerContext } from './Inner.context'
import { ThemeVariants, Variants } from './Table'
import { twMerge } from 'tailwind-merge'

export type TableHeadProps = {
  /**
   * Variant of table row
   * @default zebra
   */
  variant?: Variants | undefined
  /**
   * Variant of theme
   * @default grey
   */
  themeVariant?: ThemeVariants | undefined
} & HTMLAttributes<HTMLTableSectionElement>

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(function TableHead(
  { variant = 'zebra', themeVariant = 'grey', className = '', ...rest },
  ref,
) {
  return (
    <InnerContext.Provider value={{ variant, themeVariant, section: 'head' }}>
      <thead
        ref={ref}
        className={twMerge(
          `text-base font-medium ${
            variant === 'border'
              ? `border-b-2 ${getColorConfigForTableTheme(themeVariant)?.headerBorder}`
              : `${getColorConfigForTableTheme(themeVariant)?.headerBackground}`
          } }`,
          className,
        )}
        {...rest}
      />
    </InnerContext.Provider>
  )
})
