import { forwardRef } from 'react'
import styled from 'styled-components'
import { Accordion as RAccordion, AccordionProps as RAccordionProps } from '@reach/accordion'

export type MenuProps = RAccordionProps

const StyledAccordion = styled(RAccordion)`
  /*   margin: 0;
  padding: 0;
  list-style: none; */
  @media (min-width: 1300px) {
    display: flex;
  }
`

export const Menu = forwardRef</* HTMLUListElement */ HTMLDivElement, MenuProps>(function Menu(
  { children, ...rest },
  ref,
) {
  return (
    <StyledAccordion /* as="ul" */ ref={ref} {...rest}>
      {children}
    </StyledAccordion>
  )
})
