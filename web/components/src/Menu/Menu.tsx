import { forwardRef } from 'react'
import styled from 'styled-components'
import { Accordion as RAccordion, AccordionProps as RAccordionProps } from '@reach/accordion'

export type MenuProps = RAccordionProps

const StyledAccordion = styled(RAccordion)`
  @media (min-width: 1300px) {
    display: flex;
  }
`

export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu({ children, ...rest }, ref) {
  return (
    <StyledAccordion ref={ref} multiple collapsible {...rest}>
      {children}
    </StyledAccordion>
  )
})
