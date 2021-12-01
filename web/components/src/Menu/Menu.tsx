import { forwardRef } from 'react'
import styled from 'styled-components'
import { Accordion as RAccordion, AccordionProps as RAccordionProps } from '@reach/accordion'

export type MenuProps = RAccordionProps

const StyledAccordion = styled(RAccordion)`
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

export const Menu = forwardRef<HTMLUListElement, MenuProps>(function Menu({ children, ...rest }, ref) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: @TODO: Lets look into this at some point
    <StyledAccordion forwardedAs="ul" ref={ref} {...rest}>
      {children}
    </StyledAccordion>
  )
})
