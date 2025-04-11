import { forwardRef } from 'react'
import { Table as EdsTable, CellProps } from '@equinor/eds-core-react'
import { twMerge } from 'tailwind-merge'

const { Cell: EdsCell } = EdsTable

export type TableCellProps = CellProps

export const Cell = forwardRef<HTMLTableCellElement, TableCellProps>(function Cell(
  { children, className, ...rest },
  ref,
) {
  return (
    <EdsCell ref={ref} className={twMerge('[&>th>td]:!bg-[#A8C3DB]')} {...rest}>
      {children}
    </EdsCell>
  )
})
