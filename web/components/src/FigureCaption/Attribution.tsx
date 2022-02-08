import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type AttributionProps = HTMLAttributes<HTMLDivElement>

export const StyledAttribution = styled.div``

export const Attribution = forwardRef<HTMLDivElement, AttributionProps>(function ({ children, ...rest }, ref) {
  return (
    <StyledAttribution ref={ref} {...rest}>
      {children}
    </StyledAttribution>
  )
})
