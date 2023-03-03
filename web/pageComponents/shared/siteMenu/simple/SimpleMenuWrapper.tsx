import styled from 'styled-components'
import { Accordion as RAccordion, AccordionProps as RAccordionProps } from '@reach/accordion'

export type MenuProps = RAccordionProps

const StyledAccordion = styled(RAccordion)`
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 700px) {
    margin: 0 auto;
    max-width: var(--layout-maxContent-narrow);
  }
`

export const SimpleMenuWrapper = ({ children, ...rest }: RAccordionProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: @TODO: Lets look into this at some point
    <StyledAccordion forwardedAs="ul" {...rest} id="menu-accordion">
      {children}
    </StyledAccordion>
  )
}
