import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type CardTextProps = HTMLAttributes<HTMLDivElement>

const StyledText = styled.div<CardTextProps>`
  /** Spacing */
  padding: 0 var(--space-medium);
`
export const Text = forwardRef<HTMLDivElement, CardTextProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <StyledText ref={ref} {...rest}>
      {children}
    </StyledText>
  )
})
