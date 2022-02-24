import { forwardRef, CSSProperties } from 'react'
import { Table as EdsTable, TableProps as EdsTableProps } from '@equinor/eds-core-react'
import styled from 'styled-components'

export type TableProps = EdsTableProps

const StyledTable = styled(EdsTable)`
  overflow-x: auto;
  display: block;
  width: fit-content;
  max-width: 100%;
  /* Because of caption and display block, re add the background colour
  to the body to prevent white background for the caption */
  background: transparent;
  @media (min-width: 750px) {
    width: 100%;
    display: table;
  }
`

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
