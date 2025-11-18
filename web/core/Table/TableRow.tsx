import { type HTMLAttributes, forwardRef } from 'react'
import { getColorConfigForTableTheme } from './TableTheme'
import { useTable } from './Inner.context'
import { twMerge } from 'tailwind-merge'

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className = '', ...rest },
  ref,
) {
  const { variant, themeVariant } = useTable()
  return (
    <tr
      ref={ref}
      className={twMerge(
        `${
          variant === 'zebra'
            ? `${getColorConfigForTableTheme(themeVariant)?.rowZebraBackground} odd:last:border-b ${
                getColorConfigForTableTheme(themeVariant)?.rowZebraLastOdd
              }`
            : ''
        }`,
        className,
      )}
      {...rest}
    />
  )
})
