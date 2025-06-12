import { type HTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../twMerge'
import { getColorConfigForTableTheme } from './TableTheme'
import { useTable } from './Inner.context'

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className = '', ...rest },
  ref,
) {
  const { variant, themeVariant } = useTable()
  return (
    <tr
      ref={ref}
      className={envisTwMerge(
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
