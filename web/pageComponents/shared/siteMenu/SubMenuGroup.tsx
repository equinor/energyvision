import { ReactNode } from 'react'
import styled from 'styled-components'
import { List, Heading, HeadingProps, ListProps } from '@components'

const StyledSubMenuGroup = styled.div`
  @media (min-width: 1300px) {
    padding-right: var(--space-xLarge);
  }
`

const StyledSubMenuGroupHeading = styled(Heading)`
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

type Props = {
  children: ReactNode
}

export const SubMenuGroup = ({ children, ...rest }: Props) => {
  return <StyledSubMenuGroup {...rest}>{children}</StyledSubMenuGroup>
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
