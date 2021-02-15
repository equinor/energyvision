import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type ActionProps = HTMLAttributes<HTMLDivElement>

const StyledAction = styled.div`
  margin-top: auto;
`

export const Action = forwardRef<HTMLDivElement, ActionProps>(function CardMedia({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <StyledAction {...props}>{children}</StyledAction>
})
