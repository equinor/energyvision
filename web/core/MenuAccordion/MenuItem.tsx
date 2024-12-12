import { Accordion, AccordionItemProps } from '@core/Accordion'
import { Variants } from './MenuAccordion'

export type MenuItemProps = {
  children: React.ReactNode
  variant?: Variants
} & Omit<AccordionItemProps, 'variant'>

export const MenuItem = ({ children, variant = 'default', ...rest }: MenuItemProps) => {
  return (
    <Accordion.Item variant={variant === 'simple' ? 'simple_menu' : 'menu'} asChild {...rest}>
      <li>{children}</li>
    </Accordion.Item>
  )
}
