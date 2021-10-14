import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledNavTopbar = styled.div`
  height: var(--topbar-height);
  padding: var(--space-small) var(--space-medium);
  display: flex;
  align-items: center;
  max-width: calc(var(--topbar-innerMaxWidth) + (var(--space-medium) * 2));
  margin: auto;
`

type Props = {
  children: ReactNode
}

export const NavTopbar = ({ children, ...rest }: Props) => {
  return <StyledNavTopbar {...rest}>{children}</StyledNavTopbar>
}
