import { forwardRef } from 'react'

import { Accordion as RAccordion, AccordionProps as RAccordionProps } from '@reach/accordion'

export type MenuProps = RAccordionProps

export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu({ children, ...rest }, ref) {
  return (
    <RAccordion ref={ref} {...rest}>
      {children}
    </RAccordion>
  )
})
