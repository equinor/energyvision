import { forwardRef } from 'react'
import styled from 'styled-components'
import { AccordionItem as RAccordionItem, AccordionItemProps as RAccordionItemProps } from '@reach/accordion'

const StyledItem = styled(RAccordionItem)`
  border-bottom: 1px solid var(--grey-40);
  @media (min-width: 1300px) {
    border: 0;
  }
`
export type SubMenuProps = RAccordionItemProps & {
  id: number
}

export const SubMenu = forwardRef<HTMLLIElement, SubMenuProps>(function SubMenuProps({ id, children, ...rest }, ref) {
  console.log('index', id)
  return (
    <StyledItem forwardedAs="li" {...rest} index={id}>
      {children}
    </StyledItem>
  )
})
