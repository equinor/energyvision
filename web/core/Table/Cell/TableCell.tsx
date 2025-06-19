import { TdHTMLAttributes, ThHTMLAttributes, forwardRef } from 'react'
import { TableDataCell } from './TableDataCell'
import { TableHeaderCell } from './TableHeaderCell'
import { InnerContext } from '../Inner.context'

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> | ThHTMLAttributes<HTMLTableCellElement>
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell({ ...rest }, ref) {
  return (
    <InnerContext.Consumer>
      {({ variant, section, themeVariant }) => {
        switch (section) {
          case 'head':
            return <TableHeaderCell ref={ref} variant={variant} themeVariant={themeVariant} {...rest} />
          default:
          case 'body':
            return <TableDataCell ref={ref} variant={variant} themeVariant={themeVariant} {...rest} />
        }
      }}
    </InnerContext.Consumer>
  )
})
