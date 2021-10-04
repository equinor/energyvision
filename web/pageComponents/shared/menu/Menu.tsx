import { CSSProperties, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { MenuGroup } from './MenuGroup'
import { Menu as EnvisMenu, MenuButton } from '@components'
import { RemoveScroll } from 'react-remove-scroll'
/* import { useMenu } from './MenuProvider' */
import useWindowSize from './hooks/useWindowSize'
import type { MenuData, SubMenuData } from '../../../types/types'

const TopbarDropdown = styled.div`
  position: fixed;
  width: 100%;
  height: calc(100vh - var(--offset));
  background: var(--ui-background-default);
  overflow: auto;
  display: var(--display);
  z-index: 200;
  top: var(--offset);
  left: 0;
  @media (min-width: 1300px) {
    display: block;
    height: auto;
    position: static;
  }
`

export type MenuProps = {
  data?: MenuData
  height: number
}

const Menu = ({ data, height = 0 }: MenuProps) => {
  const router = useRouter()
  const windowSize = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)
  const [indices, setIndices] = useState<number[]>([])
  const handleRouteChange = useCallback(() => {
    setIsOpen(false)
    setIndices([])
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

  function onMenuButtonClick() {
    setIsOpen(!isOpen)
  }

  function toggleItem(toggledIndex: number) {
    // @TODO No fancy code optimization yet :D

    // @TODO Mobile or desktop first

    if (windowSize.width && windowSize.width > 1300) {
      // This menu item is  open, so let's close the menu by removing it from the list
      if (indices[0] === toggledIndex) {
        return setIndices([])
      }
      // Otherwise let's swap the current one with the new
      setIndices([toggledIndex])
    } else {
      if (indices.includes(toggledIndex)) {
        // This menu item is already open, so let's close it by removing it from the list
        const expandedItems = indices.filter((currentIndex) => currentIndex !== toggledIndex)
        return setIndices(expandedItems)
      }
      // Otherwise add it to the list
      setIndices([...indices, toggledIndex])
    }
  }

  const menuItems = (data && data.subMenus) || []
  console.log('window size', windowSize)
  return (
    <>
      {/* @TODO: Do we want to remove scroll? */}
      <MenuButton title="Menu" ariaExpanded={isOpen} onClick={onMenuButtonClick} />
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
            <EnvisMenu index={indices} onChange={toggleItem}>
              {menuItems.map((topLevelItem: SubMenuData) => {
                if (topLevelItem?.topLevelLink.isDisabled) return null
                return <MenuGroup key={topLevelItem.id} {...topLevelItem} />
              })}
            </EnvisMenu>
          </nav>
        </TopbarDropdown>
      </RemoveScroll>
    </>
  )
}
export default Menu
