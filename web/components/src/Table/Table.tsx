import { forwardRef, CSSProperties } from 'react'
import { Table as EdsTable, TableProps as EdsTableProps } from '@equinor/eds-core-react'
import styled from 'styled-components'

export type TableProps = EdsTableProps

const StyledTable = styled(EdsTable)``

export const Table = forwardRef<HTMLTableElement, TableProps>(function List({ children, style, ...rest }, ref) {
  return (
    <StyledTable
      ref={ref}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledTable>
  )
})
