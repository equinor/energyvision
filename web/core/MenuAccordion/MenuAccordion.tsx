import { Accordion, AccordionMultipleProps, AccordionSingleProps } from '@/core/Accordion'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { forwardRef } from 'react'

export type Variants = 'default' | 'simple'

export type MenuAccordionProps = {
  id?: string
  variant?: Variants
} & Omit<AccordionSingleProps | AccordionMultipleProps, 'type'>

export const MenuAccordion = forwardRef<HTMLDivElement, MenuAccordionProps>(function MenuAccordion(
  { children, variant = 'default', ...rest },
  ref,
) {
  const useComplex = useMediaQuery(`(min-width: 1300px)`)

  const variantClassName: Partial<Record<Variants, string>> = {
    default: 'max-xl:px-layout-sm w-auto mx-auto flex flex-col xl:flex-row',
    simple: 'max-xl:px-layout-sm flex flex-col',
  }
  const accordionType = useComplex ? 'single' : 'multiple'

  return (
    //@ts-ignore: TODO: Fix the type casting
    <Accordion
      {...rest}
      type={accordionType}
      ref={ref}
      id="menu-accordion"
      asChild
      orientation={'vertical'}
      className={`${variantClassName[variant]}`}
    >
      <ul>{children}</ul>
    </Accordion>
  )
})
