import styled from 'styled-components'
import { AccordionItem as RAccordionItem, AccordionItemProps as RAccordionItemProps } from '@reach/accordion'

const StyledItem = styled(RAccordionItem)`
  border-bottom: 1px solid var(--grey-20);
  @media (min-width: 1300px) {
    border: 0;
  }
`
export type SubMenuProps = RAccordionItemProps & {
  id: number
}

export const SubMenu = ({ id, children, ...rest }: SubMenuProps) => {
  return (
    <StyledItem forwardedAs="li" {...rest} index={id}>
      {children}
    </StyledItem>
  )
}
