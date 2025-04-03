import { Accordion, AccordionItemProps } from '@core/Accordion'
import { Variants } from './MenuAccordion'
import { forwardRef } from 'react'

export type MenuItemProps = {
  children: React.ReactNode
  variant?: Variants
} & Omit<AccordionItemProps, 'variant'>

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { children, variant = 'default', ...rest },
  ref,
) {
  return (
    <Accordion.Item ref={ref} variant={variant === 'simple' ? 'simpleMenu' : 'menu'} asChild {...rest}>
      <li>{children}</li>
    </Accordion.Item>
  )
})
