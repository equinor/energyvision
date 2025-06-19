import { type TdHTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../../twMerge'
import { ThemeVariants, Variants } from '../Table'
import { getColorConfigForTableTheme } from '../TableTheme'

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
      className={envisTwMerge(
        `text-xs p-4 text-balance
          ${
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
