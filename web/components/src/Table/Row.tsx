import { forwardRef } from 'react'
import { Table as EdsTable } from '@equinor/eds-core-react'
import { twMerge } from 'tailwind-merge'

const { Row: EdsRow } = EdsTable

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>

export const Row = forwardRef<HTMLTableRowElement, TableRowProps>(function Row({ children, className, ...rest }, ref) {
  return (
    <EdsRow ref={ref} {...rest} className={twMerge('hover:!bg-transparent')}>
      {children}
    </EdsRow>
  )
})
