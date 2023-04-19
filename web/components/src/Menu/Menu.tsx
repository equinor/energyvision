import { forwardRef } from 'react'
import styled from 'styled-components'
import { Accordion, AccordionProps } from '@chakra-ui/react'

export type MenuProps = {
  id?: string
} & AccordionProps

const StyledAccordion = styled(Accordion)`
  font-size: var(--typeScale-1); // needed for components that inherit font-size
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 700px) {
    margin: var(--menu-paddingVertical) 0 0 var(--menu-paddingHorizontal);
    width: var(--minViewportWidth);
  }
  @media (min-width: 1300px) {
    margin: 0 auto;
    width: auto;
    display: flex;
  }
`

export const Menu = forwardRef<HTMLUListElement, MenuProps>(function Menu({ children }, ref) {
  return (
    <StyledAccordion forwardedAs="ul" allowToggle ref={ref} id="menu-accordion">
      {children}
    </StyledAccordion>
  )
})
