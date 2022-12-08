import { forwardRef } from 'react'

import { Accordion as RAccordion, AccordionProps as RAccordionProps } from '@reach/accordion'
import { Accordion as CAccordion } from '@chakra-ui/react'
import { Flags } from '../../../common/helpers/datasetHelpers'

export type AccordionProps = RAccordionProps & {
  id: string
}
export type CAccordionProps = {
  id: string
  children?: React.ReactNode
}

export const Accordion = Flags.IS_DEV
  ? forwardRef<HTMLDivElement, CAccordionProps>(function Accordion({ id, children }, ref) {
      return (
        <CAccordion ref={ref} allowMultiple id={id}>
          {children}
        </CAccordion>
      )
    })
  : forwardRef<HTMLDivElement, AccordionProps>(function Accordion({ id, children, ...rest }, ref) {
      return (
        <RAccordion ref={ref} {...rest} id={id}>
          {children}
        </RAccordion>
      )
    })
