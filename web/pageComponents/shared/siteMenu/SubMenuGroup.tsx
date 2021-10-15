import { ReactNode } from 'react'
import styled from 'styled-components'
import { List, Heading, HeadingProps, ListProps } from '@components'

const StyledSubMenuGroupHeading = styled(Heading)`
  font-weight: 600;
  padding: var(--space-xLarge) var(--space-medium) calc(var(--space-small) + var(--space-xSmall)) var(--space-medium);
  @media (min-width: 1300px) {
    letter-spacing: 2px;
    font-size: var(--typeScale-0);
    padding: 0;
  }
`

const StyledSubMenuGroupList = styled(List)`
  @media (min-width: 1300px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    max-width: 13rem;
  }
`

type Props = {
  children: ReactNode
}

export const SubMenuGroupHeading = ({ children, ...rest }: Props & HeadingProps) => {
  return (
    <StyledSubMenuGroupHeading uppercase {...rest}>
      {children}
    </StyledSubMenuGroupHeading>
  )
}
export const SubMenuGroupList = ({ children, ...rest }: Props & ListProps) => {
  return <StyledSubMenuGroupList {...rest}>{children}</StyledSubMenuGroupList>
}
