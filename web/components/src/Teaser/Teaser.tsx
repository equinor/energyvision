import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type TeaserProps = HTMLAttributes<HTMLElement>

export const StyledCard = styled.article``

export const Teaser = forwardRef<HTMLDivElement, TeaserProps>(function Teaser({ children, ...rest }, ref) {
  return (
    <StyledCard ref={ref} {...rest}>
      {children}
    </StyledCard>
  )
})
