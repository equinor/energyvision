import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

// Don't use EDS Header because it doesn't fit our needs
const StyledHeader = styled.div`
  flex-direction: column;
  align-items: flex-start;

  [data-dynamic-typography-version='v1'] & {
    padding: 0 1rem;
  }

  [data-dynamic-typography-version='v2'] & {
    padding: 0 var(--space-medium);
  }
`
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>

export const Header = forwardRef<HTMLDivElement, CardHeaderProps>(function Media({ children, ...rest }, ref) {
  return (
    <StyledHeader ref={ref} {...rest}>
      {children}
    </StyledHeader>
  )
})
