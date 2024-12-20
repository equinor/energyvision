import { MenuButton, MenuButtonProps } from './MenuButton'
import { MenuAccordion as MenuWrapper, MenuAccordionProps } from './MenuAccordion'
import { MenuItem, MenuItemProps } from './MenuItem'
import { MenuHeader, MenuHeaderProps } from './MenuHeader'
import { MenuContent, MenuContentProps } from './MenuContent'

type MenuCompoundProps = typeof MenuWrapper & {
  MenuItem: typeof MenuItem
  MenuHeader: typeof MenuHeader
  MenuContent: typeof MenuContent
}

const Menu = MenuWrapper as MenuCompoundProps
Menu.MenuItem = MenuItem
Menu.MenuHeader = MenuHeader
Menu.MenuContent = MenuContent

export { MenuButton, Menu }
export type { MenuButtonProps, MenuAccordionProps, MenuItemProps, MenuHeaderProps, MenuContentProps }
