import styled from 'styled-components'
import { AccordionItem } from '@chakra-ui/react'

const StyledItem = styled(AccordionItem)`
  border-bottom: 0.5px solid var(--grey-40);
  @media (min-width: 1300px) {
    border: 0;
  }
`

export type SubMenuProps = {
  id: number
  children: React.ReactNode
}

export const SubMenu = ({ id, children, ...rest }: SubMenuProps) => {
  return (
    <StyledItem forwardedAs="li" {...rest} index={id}>
      {children}
    </StyledItem>
  )
}
