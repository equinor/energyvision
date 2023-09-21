import styled from 'styled-components'
import { Accordion, AccordionProps } from '@chakra-ui/react'

export type MenuProps = AccordionProps

const StyledAccordion = styled(Accordion)`
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 700px) {
    margin: 0 auto;
    max-width: var(--layout-maxContent-narrow);
  }
`

export const SimpleMenuWrapper = ({ children, ...rest }: MenuProps) => {
  return (
    <StyledAccordion allowToggle forwardedAs="ul" {...rest} id="menu-accordion">
      {children}
    </StyledAccordion>
  )
}
