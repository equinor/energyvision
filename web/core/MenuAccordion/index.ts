import {
  type MenuAccordionProps,
  MenuAccordion as MenuWrapper,
} from './MenuAccordion'
import { MenuButton, type MenuButtonProps } from './MenuButton'
import { MenuContent, type MenuContentProps } from './MenuContent'
import { MenuHeader, type MenuHeaderProps } from './MenuHeader'
import { MenuItem, type MenuItemProps } from './MenuItem'

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
export type {
  MenuButtonProps,
  MenuAccordionProps,
  MenuItemProps,
  MenuHeaderProps,
  MenuContentProps,
}
