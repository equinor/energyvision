import { List } from '@components'
import styled from 'styled-components'
import { SubMenu } from './SubMenu'
/* import { useMenu } from './MenuProvider' */
import type { MenuData, SubMenuData } from '../../../types/types'

const MenuWrapper = styled.nav`
  margin: 0 auto;

  a {
    margin: 0 var(--space-medium) 0 0;
  }
`

const TopLevelList = styled(List)`
  display: inline-flex;
  flex-wrap: wrap;
`

export type MenuProps = {
  data?: MenuData
}

const Menu = ({ data }: MenuProps) => {
  /* const { isOpen, closeMenu, openMenu, setActive, getActiveMenuItem, removeActive } = useMenu() */
  /*   const [activeMenuItem, setActiveMenuItem] = useState(getInitialMenuItem(router)) */

  const menuItems = (data && data.subMenus) || []
  return (
    <>
      <MenuWrapper>
        {/* For testing state 
          <input placeholder="Search..." /> */}

        {menuItems && (
          <TopLevelList unstyled>
            {menuItems.map((topLevelItem: SubMenuData) => {
              if (topLevelItem?.topLevelLink.isDisabled) return null
              return <SubMenu key={topLevelItem.id} {...topLevelItem} />
            })}
          </TopLevelList>
        )}
      </MenuWrapper>
    </>
  )
}
export default Menu
