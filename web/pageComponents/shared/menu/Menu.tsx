import { CSSProperties, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWindowSize } from '@reach/window-size'
import { RemoveScroll } from 'react-remove-scroll'
import FocusLock from 'react-focus-lock'
import NextLink from 'next/link'
import { Menu as EnvisMenu, MenuButton, Link } from '@components'
import { MenuGroup } from './MenuGroup'

import type { MenuData, SubMenuData } from '../../../types/types'

const TopbarDropdown = styled.div`
  position: fixed;
  background: var(--ui-background-default);
  overflow: auto;
  display: var(--display);
  z-index: 50;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

const MenuContainer = styled.div`
  background-color: transparent;
  @media (min-width: 1300px) {
    background-color: var(--moss-green-50);
    margin: var(--space-xLarge) var(--space-large) 0 var(--space-large);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const AllSitesLink = styled(Link)`
  display: none;
  @media (min-width: 1300px) {
    display: inline-flex;
    border-left: 2px solid var(--white-100);
    padding: var(--space-large) var(--space-large);
    text-decoration: none;
  }
`
const NavTopbar = styled.div`
  height: var(--topbar-height);
  padding: var(--space-small) var(--space-medium);
  display: flex;
  align-items: center;
`

export type MenuProps = {
  data?: MenuData
}

const Menu = ({ data, ...rest }: MenuProps) => {
  const router = useRouter()
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)
  const [indices, setIndices] = useState<number[]>([])
  const menuItems = (data && data.subMenus) || []

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
    // @TODO Mobile or desktop first
    if (width && width > 1299) {
      // This menu item is  open, so let's close the menu by removing it from the list
      if (indices[0] === toggledIndex) {
        return setIndices([])
      }
      // Otherwise let's swap the current one with the new
      setIndices([toggledIndex])
    } else {
      // Small devices version
      if (indices.includes(toggledIndex)) {
        // This menu item is already open, so let's close it by removing it from the list
        const expandedItems = indices.filter((currentIndex) => currentIndex !== toggledIndex)
        return setIndices(expandedItems)
      }
      // Otherwise add it to the list
      setIndices([...indices, toggledIndex])
    }
  }

  return (
    <>
      <MenuButton title="Menu" aria-expanded={isOpen} onClick={onMenuButtonClick} {...rest} />
      <FocusLock disabled={!isOpen} returnFocus>
        <RemoveScroll enabled={isOpen}>
          <TopbarDropdown
            style={
              {
                '--display': isOpen ? 'block' : 'none',
              } as CSSProperties
            }
          >
            <nav>
              <NavTopbar>
                {/*  @TODO: Translations of string */}
                <MenuButton title="Menu" aria-expanded={true} expanded onClick={() => setIsOpen(false)}></MenuButton>
              </NavTopbar>
              <MenuContainer>
                <EnvisMenu index={indices} onChange={toggleItem}>
                  {menuItems.map((topLevelItem: SubMenuData) => {
                    if (topLevelItem?.topLevelLink.isDisabled) return null
                    return <MenuGroup key={topLevelItem.id} {...topLevelItem} />
                  })}
                </EnvisMenu>
                <NextLink href="/" passHref>
                  {/* @TODO Language strings */}
                  <AllSitesLink>All sites</AllSitesLink>
                </NextLink>
              </MenuContainer>
            </nav>
          </TopbarDropdown>
        </RemoveScroll>
      </FocusLock>
    </>
  )
}
export default Menu
