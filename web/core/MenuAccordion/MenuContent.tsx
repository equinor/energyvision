import { forwardRef } from 'react'
import { Variants } from './MenuAccordion'
import { Accordion, AccordionContentProps } from '@core/Accordion'

export type MenuContentProps = {
  variant?: Variants
} & Omit<AccordionContentProps, 'variant'>

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(function SubMenuPanel(
  { className = '', variant = 'default', children, ...rest },
  ref,
) {
  return (
    <Accordion.Content variant={variant === 'simple' ? 'primary' : 'menu'} ref={ref} className={className} {...rest}>
      {children}
    </Accordion.Content>
  )
})
