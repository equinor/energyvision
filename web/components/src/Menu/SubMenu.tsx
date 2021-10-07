import { forwardRef } from 'react'
import styled from 'styled-components'
import { AccordionItem as RAccordionItem, AccordionItemProps as RAccordionItemProps } from '@reach/accordion'

const StyledItem = styled(RAccordionItem)`
  border-bottom: 1px solid var(--grey-40);
  @media (min-width: 1300px) {
    border: 0;
  }
`
export type SubMenuProps = RAccordionItemProps

export const SubMenu = forwardRef</* HTMLLIElement */ HTMLDivElement, SubMenuProps>(function SubMenu(
  { children, ...rest },
  ref,
) {
  return (
    <StyledItem /* as="li" */ ref={ref} {...rest}>
      {children}
    </StyledItem>
  )
})
