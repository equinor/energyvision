import { AnchorHTMLAttributes } from 'react'
import styled from 'styled-components'

export const StyledHitLink = styled.a`
  padding: var(--space-medium) 0;
  text-decoration: none;
  display: block;
  border: 2px solid transparent;
  color: var(--inverted-text);
`

export type HitLinkProps = {
  setIsOpen: (arg0: boolean) => void
} & AnchorHTMLAttributes<HTMLAnchorElement>

const HitLink = ({ setIsOpen, children }: HitLinkProps) => {
  return <StyledHitLink onClick={() => setIsOpen(false)}>{children}</StyledHitLink>
}

export default HitLink
