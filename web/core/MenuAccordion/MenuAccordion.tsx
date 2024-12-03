import * as _Accordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

export type MenuAccordionProps = {
  id?: string
} & Omit<_Accordion.AccordionSingleProps, 'type'>

/* const StyledAccordion = styled(Accordion)`
  @media (min-width: 700px) {
    margin: var(--menu-paddingVertical) 0 0 var(--menu-paddingHorizontal);
    width: var(--minViewportWidth);?
  }
` */

export const MenuAccordion = forwardRef<HTMLDivElement, MenuAccordionProps>(function MenuAccordion(
  { children, ...rest },
  ref,
) {
  return (
    <_Accordion.Root
      {...rest}
      type="single"
      orientation="horizontal"
      ref={ref}
      id="menu-accordion"
      role="menu"
      asChild
      className="w-auto text-base m-0 p-0 list-none md:mt-layout-md md:ml-layout-md xl:mt-0 xl:ml-auto xl:flex"
    >
      <ul>{children}</ul>
    </_Accordion.Root>
  )
})
