import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledMenuContainer = styled.div`
  background-color: transparent;
  @media (min-width: 1300px) {
    background-color: var(--moss-green-50);
    margin: var(--space-xLarge) var(--space-large) 0 var(--space-large);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

type Props = {
  children: ReactNode
}

export const MenuContainer = ({ children, ...rest }: Props) => {
  return <StyledMenuContainer {...rest}>{children}</StyledMenuContainer>
}
