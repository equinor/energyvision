// This component is just useful if the text is _not_ from a rich text editor

import { forwardRef, HTMLAttributes } from 'react'
// import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

export type CardTextProps = HTMLAttributes<HTMLDivElement>

const StyledText = styled.div<CardTextProps>`
  /** Spacing */
  padding: 0 1rem;
`
export const Text = forwardRef<HTMLDivElement, CardTextProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <StyledText ref={ref} {...rest}>
      {children}
    </StyledText>
  )
})
