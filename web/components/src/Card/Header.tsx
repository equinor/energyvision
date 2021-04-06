import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

// Don't use EDS Header because it doesn't fit our needs
const StyledHeader = styled.div`
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1rem;
`
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>

export const Header = forwardRef<HTMLDivElement, CardHeaderProps>(function Media({ children, ...rest }, ref) {
  return (
    <StyledHeader ref={ref} {...rest}>
      {children}
    </StyledHeader>
  )
})
