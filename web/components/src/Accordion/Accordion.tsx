import { forwardRef } from 'react'

import { Accordion as RAccordion, AccordionProps as RAccordionProps } from '@reach/accordion'

export type AccordionProps = RAccordionProps

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion({ children, ...rest }, ref) {
  return (
    <RAccordion ref={ref} {...rest}>
      {children}
    </RAccordion>
  )
})
