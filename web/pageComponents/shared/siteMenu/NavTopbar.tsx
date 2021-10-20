import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledNavTopbar = styled.div`
  height: var(--topbar-height);
  width: 100%;
  max-width: var(--maxViewportWidth);
  margin: auto;
  padding: var(--space-small) var(--layout-paddingHorizontal-small);
  display: flex;
  align-items: center;
  justify-content: right;
`

type Props = {
  children: ReactNode
}

export const NavTopbar = ({ children, ...rest }: Props) => {
  return <StyledNavTopbar {...rest}>{children}</StyledNavTopbar>
}
