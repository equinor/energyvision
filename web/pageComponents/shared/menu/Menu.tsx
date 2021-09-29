import { CSSProperties } from 'react'
import styled from 'styled-components'
import { MenuGroup } from './MenuGroup'
import { Menu as EnvisMenu } from '@components'
import { RemoveScroll } from 'react-remove-scroll'
/* import { useMenu } from './MenuProvider' */
import type { MenuData, SubMenuData } from '../../../types/types'

const TopbarDropdown = styled.div`
  position: fixed;
  width: 100%;
  height: calc(100vh - var(--offset));
  background: var(--ui-background-default);
  overflow: auto;

  display: var(--display);
  z-index: 200;
`

export type MenuProps = {
  data?: MenuData
  isOpen: boolean
  height: number
}

const Menu = ({ data, isOpen, height = 0 }: MenuProps) => {
  const menuItems = (data && data.subMenus) || []
  return (
    <RemoveScroll enabled={isOpen}>
      <TopbarDropdown
        style={
          {
            '--offset': `${height}px`,
            '--display': isOpen ? 'block' : 'none',
          } as CSSProperties
        }
      >
        <nav>
          <EnvisMenu>
            {menuItems.map((topLevelItem: SubMenuData) => {
              if (topLevelItem?.topLevelLink.isDisabled) return null
              return <MenuGroup key={topLevelItem.id} {...topLevelItem} />
            })}
          </EnvisMenu>
        </nav>
      </TopbarDropdown>
    </RemoveScroll>
  )
}
export default Menu
