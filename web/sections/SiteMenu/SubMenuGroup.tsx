import { ReactNode } from 'react'
import styled from 'styled-components'
import { List, Heading, HeadingProps, ListProps } from '@components'

const StyledSubMenuGroupHeading = styled(Heading)`
  color: var(--moss-green-95);
  font-weight: 650;
  letter-spacing: 0.15em;
  font-size: var(--typeScale-05) !important; // TODO: Eliminate the need for !important
  line-height: var(--lineHeight-2) !important;
  padding: var(--space-xLarge) var(--space-medium) calc(var(--space-small) + var(--space-xSmall)) var(--space-medium);
  @media (min-width: 1300px) {
    font-weight: 600;
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
    max-width: calc(13 * var(--space-medium));
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
