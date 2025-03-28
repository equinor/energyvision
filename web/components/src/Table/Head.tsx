
import { forwardRef, CSSProperties } from 'react'
import { Table as EdsTable } from '@equinor/eds-core-react'
import styled from 'styled-components'

const { Head: EdsHead } = EdsTable

export const StyledHeadItem = styled(EdsHead)``

export type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>

export const Head = forwardRef<HTMLTableSectionElement, TableHeadProps>(function Head(
  { style, children,className, ...rest },
  ref,
) {
  return (
    <StyledHeadItem
      ref={ref}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledHeadItem>
  )
})