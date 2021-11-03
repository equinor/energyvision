import { forwardRef } from 'react'

import { Accordion as RAccordion, AccordionProps as RAccordionProps } from '@reach/accordion'

export type AccordionProps = RAccordionProps & {
  id: string
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion({ id, children, ...rest }, ref) {
  return (
    <RAccordion ref={ref} {...rest} id={id}>
      {children}
    </RAccordion>
  )
})
