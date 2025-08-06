import { forwardRef, type ThHTMLAttributes } from 'react'
import { getColorConfigForTableTheme } from '../TableTheme'
import { ThemeVariants, Variants } from '../Table'

export type TableHeaderCellProps = {
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
} & ThHTMLAttributes<HTMLTableCellElement>

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(function TableHeaderCell(
  { variant = 'zebra', themeVariant = 'grey', children, ...rest },
  ref,
) {
  return (
    <th
      ref={ref}
      className={`
         p-4 
         text-sm 
         font-medium 
         text-left 
         text-balance
         max-lg:sticky
         max-lg:top-0
         max-lg:z-[1]
        ${
          variant === 'border'
            ? `${getColorConfigForTableTheme(themeVariant)?.headerText}`
            : '[&:not(:first-child)]:border-l-2 [&:not(:first-child)]:border-white-100'
        }`}
      {...rest}
    >
      {children}
    </th>
  )
})
