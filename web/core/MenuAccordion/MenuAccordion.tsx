import { Accordion, AccordionSingleProps } from '@core/Accordion'
import { forwardRef } from 'react'

export type Variants = 'default' | 'simple'

export type MenuAccordionProps = {
  id?: string
  variant?: Variants
} & Omit<AccordionSingleProps, 'type'>

export const MenuAccordion = forwardRef<HTMLDivElement, MenuAccordionProps>(function MenuAccordion(
  { children, variant = 'default', ...rest },
  ref,
) {
  const variantClassName: Partial<Record<Variants, string>> = {
    default: 'w-auto mx-auto flex flex-col xl:flex-row',
    simple: 'flex flex-col',
  }

  return (
    <Accordion
      {...rest}
      type="single"
      ref={ref}
      id="menu-accordion"
      asChild
      collapsible
      orientation={'vertical'}
      className={`${variantClassName[variant]}`}
    >
      <ul>{children}</ul>
    </Accordion>
  )
})
