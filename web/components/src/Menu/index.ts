import { MenuButton, MenuButtonProps } from './MenuButton'
import { Menu as MenuWrapper, MenuProps } from './Menu'
import { SubMenu, SubMenuProps } from './SubMenu'
import { SubMenuHeader, SubMenuHeaderProps } from './SubMenuHeader'
import { SubMenuPanel, SubMenuPanelProps } from './SubMenuPanel'

type MenuCompoundProps = typeof MenuWrapper & {
  SubMenu: typeof SubMenu
  SubMenuHeader: typeof SubMenuHeader
  SubMenuPanel: typeof SubMenuPanel
}

const Menu = MenuWrapper as MenuCompoundProps
Menu.SubMenu = SubMenu
Menu.SubMenuHeader = SubMenuHeader
Menu.SubMenuPanel = SubMenuPanel

export { MenuButton, Menu }
export type { MenuButtonProps, MenuProps, SubMenuProps, SubMenuHeaderProps, SubMenuPanelProps }
