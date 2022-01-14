import { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWindowSize } from '@reach/window-size'
import { RemoveScroll } from 'react-remove-scroll'
import FocusLock from 'react-focus-lock'
import { SimpleMenuWrapper } from './SimpleMenuWrapper'
import { MenuButton } from '@components'
import { SimpleMenuItem } from './SimpleMenuItem'

import { TopbarDropdown } from './TopbarDropdown'

import { NavTopbar } from './NavTopbar'
import { useCompare } from './hooks/useCompare'

const MenuContainer = styled.div`
  background-color: transparent;
  padding: 0 var(--space-large);
`

export type MenuProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

const SimpleSiteMenu = ({ data, ...rest }: MenuProps) => {
  const router = useRouter()
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)
  const [indices, setIndices] = useState<number[]>([])
  const menuItems = data || []
  const hasWidthChanged = useCompare(width)
  const handleRouteChange = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

  useEffect(() => {
    /* This code is to solve the issue where somebody open multiple menu items on a smaller
  device and then resize their window size to above the breakpoint for the desktop
  version where only one items is allowed */
    if (hasWidthChanged) {
      if (width > 1299 && indices.length > 1) setIndices([])
    }
  }, [width, indices.length, hasWidthChanged])

  function onMenuButtonClick() {
    setIsOpen(!isOpen)
  }

  function toggleItem(toggledIndex: number) {
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
          <TopbarDropdown isOpen={isOpen} className={RemoveScroll.classNames.zeroRight}>
            <nav>
              <NavTopbar>
                <MenuButton title="Menu" aria-expanded={true} expanded onClick={() => setIsOpen(false)}></MenuButton>
              </NavTopbar>
              <MenuContainer>
                <SimpleMenuWrapper index={indices} onChange={toggleItem}>
                  {menuItems?.groups.map((item: any, idx: number) => {
                    return <SimpleMenuItem topLevelItem={item} key={item.id} index={idx} />
                  })}
                </SimpleMenuWrapper>
              </MenuContainer>
            </nav>
          </TopbarDropdown>
        </RemoveScroll>
      </FocusLock>
    </>
  )
}
export default SimpleSiteMenu
