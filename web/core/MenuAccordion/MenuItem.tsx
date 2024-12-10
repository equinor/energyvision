import { Accordion, AccordionItemProps } from '@core/Accordion'

export type MenuItemProps = {
  children: React.ReactNode
} & AccordionItemProps

export const MenuItem = ({ children, ...rest }: MenuItemProps) => {
  return (
    <Accordion.Item variant="menu" asChild {...rest}>
      <li>{children}</li>
    </Accordion.Item>
  )
}
