import { forwardRef, CSSProperties } from 'react'
import { Table as EdsTable, CellProps } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { StyledHeadItem } from './Head'
import { twMerge } from 'tailwind-merge'

const { Cell: EdsCell } = EdsTable

const StyledCellItem = styled(EdsCell)`
  ${StyledHeadItem} & {
    background-color: var(--grey-20);
  }
`

export type TableCellProps = CellProps

export const Cell = forwardRef<HTMLTableCellElement, TableCellProps>(function Cell({ style, children, ...rest }, ref) {
  return (
    <StyledCellItem
      ref={ref}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledCellItem>
  )
})
