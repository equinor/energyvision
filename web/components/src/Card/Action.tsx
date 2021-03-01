import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Card } from '@equinor/eds-core-react'

const { Actions: EdsAction } = Card

export type CardActionProps = HTMLAttributes<HTMLDivElement>

const StyledAction = styled(EdsAction)`
  align-self: end;
  padding: 0 1rem;
`

export const Action = forwardRef<HTMLDivElement, CardActionProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <StyledAction ref={ref} {...rest}>
      {children}
    </StyledAction>
  )
})
