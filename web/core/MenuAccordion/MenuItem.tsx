import { AccordionItem, AccordionItemProps } from '@radix-ui/react-accordion'

export type MenuItemProps = {
  children: React.ReactNode
} & AccordionItemProps

export const MenuItem = ({ children, ...rest }: MenuItemProps) => {
  return (
    <AccordionItem {...rest} asChild role="menuitem" className="border-b-[0.5] border-grey-40 xl:border-b-0">
      <li>{children}</li>
    </AccordionItem>
  )
}
