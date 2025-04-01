import { forwardRef, CSSProperties } from 'react'
import { Table as EdsTable } from '@equinor/eds-core-react'
import styled from 'styled-components'

const { Row: EdsRow } = EdsTable

const StyledRowItem = styled(EdsRow)`
  &:hover {
    background-color: transparent;
  }
`

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>

export const Row = forwardRef<HTMLTableRowElement, TableRowProps>(function Row({ style, children, className,...rest }, ref) {
  return (
    <StyledRowItem
      ref={ref}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledRowItem>
  )
})
