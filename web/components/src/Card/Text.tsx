import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

export type CardTextProps = HTMLAttributes<HTMLHeadingElement>

const StyledText = styled(Typography)`
  /** Spacing */
  padding: 0 1rem;
`
export const Text = forwardRef<HTMLElement, CardTextProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <StyledText variant="ingress" ref={ref} {...rest}>
      {children}
    </StyledText>
  )
})
