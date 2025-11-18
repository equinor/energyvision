import { type TdHTMLAttributes, forwardRef } from 'react'
import { ThemeVariants, Variants } from '../Table'
import { getColorConfigForTableTheme } from '../TableTheme'
import { twMerge } from 'tailwind-merge'

export type TableDataCellProps = {
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
} & TdHTMLAttributes<HTMLTableCellElement>

export const TableDataCell = forwardRef<HTMLTableCellElement, TableDataCellProps>(function DataCell(
  { variant = 'zebra', themeVariant = 'grey', className = '', ...rest },
  ref,
) {
  return (
    <td
      ref={ref}
      className={twMerge(
        `p-4 text-xs text-balance ${
          variant === 'border'
            ? `border-b ${getColorConfigForTableTheme(themeVariant)?.rowBorder}`
            : `[&:not(:first-child)]:border-l [&:not(:first-child)]:border-white-100`
        }`,
        className,
      )}
      {...rest}
    />
  )
})
