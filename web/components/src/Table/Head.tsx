import { forwardRef } from 'react'
import { Table as EdsTable } from '@equinor/eds-core-react'

const { Head: EdsHead } = EdsTable

export type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>

export const Head = forwardRef<HTMLTableSectionElement, TableHeadProps>(function Head({ children, ...rest }, ref) {
  return (
    <EdsHead ref={ref} {...rest}>
      {children}
    </EdsHead>
  )
})
