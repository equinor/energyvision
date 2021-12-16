import { forwardRef, CSSProperties } from 'react'
import { Table as EdsTable } from '@equinor/eds-core-react'
import styled from 'styled-components'

const { Body: EdsBody } = EdsTable

const StyledBodyItem = styled(EdsBody)``

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

export const Body = forwardRef<HTMLTableSectionElement, TableBodyProps>(function Body(
  { style, children, ...rest },
  ref,
) {
  return (
    <StyledBodyItem
      ref={ref}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledBodyItem>
  )
})
