import { forwardRef } from 'react'
import { Table as EdsTable } from '@equinor/eds-core-react'
import { twMerge } from 'tailwind-merge'

const { Body: EdsBody } = EdsTable

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

export const Body = forwardRef<HTMLTableSectionElement, TableBodyProps>(function Body(
  { children, className, ...rest },
  ref,
) {
  return (
    <EdsBody ref={ref} className={twMerge('!bg-white-100')} {...rest}>
      {children}
    </EdsBody>
  )
})
