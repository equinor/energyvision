import { MenuButton, MenuButtonProps } from './MenuButton'
import { Menu as MenuWrapper, MenuProps } from './Menu'
import { SubMenu, SubMenuProps } from './SubMenu'
import { SubMenuHeader, SubMenuHeaderProps } from './SubMenuHeader'
import { SubMenuPanel, SubMenuPanelProps } from './SubMenuPanel'
import { SubMenuGroups, SubMenuGroupsProps } from './SubMenuGroups'
import { ChakraSubMenuHeader } from './ChakraSubMenuHeader'
import { Flags } from '../../../common/helpers/datasetHelpers'

type MenuCompoundProps = typeof MenuWrapper & {
  SubMenu: typeof SubMenu
  SubMenuHeader: typeof SubMenuHeader
  SubMenuPanel: typeof SubMenuPanel
  SubMenuGroups: typeof SubMenuGroups
}

const Menu = MenuWrapper as MenuCompoundProps
Menu.SubMenu = SubMenu
Menu.SubMenuHeader = Flags.IS_DEV ? ChakraSubMenuHeader : SubMenuHeader
Menu.SubMenuPanel = SubMenuPanel
Menu.SubMenuGroups = SubMenuGroups

export { MenuButton, Menu }
export type { MenuButtonProps, MenuProps, SubMenuProps, SubMenuHeaderProps, SubMenuPanelProps, SubMenuGroupsProps }
