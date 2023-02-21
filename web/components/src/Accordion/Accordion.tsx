import { forwardRef } from 'react'

import { Accordion as CAccordion, AccordionProps as ChakraAccordionProps } from '@chakra-ui/react'

export type AccordionProps = {
  id: string
} & ChakraAccordionProps

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion({ id, children }, ref) {
  return (
    <CAccordion ref={ref} allowMultiple id={id}>
      {children}
    </CAccordion>
  )
})
