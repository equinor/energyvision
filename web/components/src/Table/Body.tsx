import { forwardRef } from 'react'
import { Table as EdsTable } from '@equinor/eds-core-react'
import 'tailwindcss/tailwind.css'

const { Body: EdsBody } = EdsTable

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

export const Body = forwardRef<HTMLTableSectionElement, TableBodyProps>(function Body(
  { children, ...rest },
  ref,
) {
  return (
    <EdsBody
      ref={ref}
      className="bg-white-100"
      {...rest}
    >
      {children}
    </EdsBody>
  )
})