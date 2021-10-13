import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledNavTopbar = styled.div`
  height: var(--topbar-height);
  padding: var(--space-small) var(--space-medium);
  display: flex;
  align-items: center;
`

type Props = {
  children: ReactNode
}

export const NavTopbar = ({ children, ...rest }: Props) => {
  return <StyledNavTopbar {...rest}>{children}</StyledNavTopbar>
}
