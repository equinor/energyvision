import { forwardRef } from 'react'
import styled from 'styled-components'
import { AccordionItem as RAccordionItem, AccordionItemProps as RAccordionItemProps } from '@reach/accordion'

const StyledItem = styled(RAccordionItem)`
  border-bottom: 1px solid var(--grey-40);
`
export type AccordionItemProps = RAccordionItemProps

export const Item = forwardRef<HTMLDivElement, RAccordionItemProps>(function Item({ children, ...rest }, ref) {
  return (
    <StyledItem ref={ref} {...rest}>
      {children}
    </StyledItem>
  )
})
