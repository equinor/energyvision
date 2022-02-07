import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type CaptionProps = HTMLAttributes<HTMLSpanElement>

export const StyledCaption = styled.span`
  :not(:only-of-type) {
    margin-right: var(--space-xSmall);
  }
`

export const Caption = forwardRef<HTMLSpanElement, CaptionProps>(function ({ children, ...rest }, ref) {
  return (
    <StyledCaption ref={ref} {...rest}>
      {children}
    </StyledCaption>
  )
})
