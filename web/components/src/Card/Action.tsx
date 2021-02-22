import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Card } from '@equinor/eds-core-react'

const { Actions: EdsAction } = Card

export type ActionProps = HTMLAttributes<HTMLDivElement>

const StyledAction = styled(EdsAction)`
  align-self: end;
`

export const Action = forwardRef<HTMLDivElement, ActionProps>(function CardMedia({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <StyledAction {...props}>{children}</StyledAction>
})
