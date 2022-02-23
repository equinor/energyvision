import { AnchorHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'

export const StyledHitLink = styled.a`
  padding: var(--space-medium) 0;
  text-decoration: none;
  display: block;
  border: 2px solid transparent;
  color: var(--inverted-text);
  cursor: pointer;
  outline: none;
`

export type HitLinkProps = {
  setIsOpen: (arg0: boolean) => void
} & AnchorHTMLAttributes<HTMLAnchorElement>

const HitLink = forwardRef<HTMLAnchorElement, HitLinkProps>(function HitLink({ setIsOpen, children, ...rest }, ref) {
  return (
    <StyledHitLink ref={ref} {...rest} onClick={() => setIsOpen(false)}>
      {children}
    </StyledHitLink>
  )
})

export default HitLink
