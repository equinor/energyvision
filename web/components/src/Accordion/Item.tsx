import styled from 'styled-components'
import { AccordionItem as RAccordionItem, AccordionItemProps as RAccordionItemProps } from '@reach/accordion'

const StyledItem = styled(RAccordionItem)`
  border-bottom: 1px solid var(--grey-40);
`

export type AccordionItemProps = RAccordionItemProps & {
  id: number
}

export const Item = ({ id, children, ...rest }: AccordionItemProps) => {
  return (
    <StyledItem {...rest} index={id}>
      {children}
    </StyledItem>
  )
}
