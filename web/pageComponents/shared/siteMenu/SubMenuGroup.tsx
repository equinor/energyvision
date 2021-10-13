import { ReactNode } from 'react'
import styled from 'styled-components'
import { Link, List, Heading, HeadingProps, ListProps } from '@components'

const StyledSubMenuGroup = styled.div`
  @media (min-width: 1300px) {
    padding-right: var(--space-xLarge);
  }
`

const StyledSubMenuGroupHeading = styled(Heading)`
  text-transform: uppercase;
  color: var(--grey-60);
  padding: var(--space-xLarge) var(--space-xLarge) calc(var(--space-small) + var(--space-xSmall)) var(--space-xLarge);
  @media (min-width: 1300px) {
    padding: 0 var(--space-xLarge) var(--space-small) 0;
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

const StyledSubMenuGroupLink = styled(Link)`
  display: flex;
  text-decoration: none;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-xLarge);
  @media (min-width: 1300px) {
    padding: var(--space-small) 0 var(--space-small) 0;
  }
`
type Props = {
  children: ReactNode
}

export const SubMenuGroup = ({ children, ...rest }: Props) => {
  return <StyledSubMenuGroup {...rest}>{children}</StyledSubMenuGroup>
}
export const SubMenuGroupHeading = ({ children, ...rest }: Props & HeadingProps) => {
  return <StyledSubMenuGroupHeading {...rest}>{children}</StyledSubMenuGroupHeading>
}
export const SubMenuGroupList = ({ children, ...rest }: Props & ListProps) => {
  return <StyledSubMenuGroupList {...rest}>{children}</StyledSubMenuGroupList>
}
export const SubMenuGroupLink = ({ children, ...rest }: Props) => {
  return <StyledSubMenuGroupLink {...rest}>{children}</StyledSubMenuGroupLink>
}
