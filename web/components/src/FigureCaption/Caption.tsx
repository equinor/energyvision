import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type CaptionProps = HTMLAttributes<HTMLDivElement>

export const StyledCaption = styled.div``

export const Caption = forwardRef<HTMLDivElement, CaptionProps>(function ({ children, ...rest }, ref) {
  return (
    <StyledCaption ref={ref} {...rest}>
      {children}
    </StyledCaption>
  )
})
