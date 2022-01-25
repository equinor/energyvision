// The simple variant for the menu is used by the satellite sites

import { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWindowSize } from '@reach/window-size'
import { RemoveScroll } from 'react-remove-scroll'
import FocusLock from 'react-focus-lock'
import { SimpleMenuWrapper } from './SimpleMenuWrapper'
import { MenuButton, Link } from '@components'
import { SimpleMenuItem } from './SimpleMenuItem'
import NextLink from 'next/link'

import type { SimpleMenuData, SimpleGroupData } from '../../../../types/types'

import { TopbarDropdown } from '../TopbarDropdown'
import { LogoLink } from '../../LogoLink'
import { NavTopbar } from '../NavTopbar'
import { useCompare } from '../hooks/useCompare'

const MenuContainer = styled.div`
  background-color: transparent;
  padding: 0 var(--space-large);
`

const MenuLink = styled(Link)`
  padding: calc(var(--space-small) + var(--space-small)) 0;
  svg {
    display: none;
  }
  &:hover {
    background-color: var(--grey-10);
  }
`

export type MenuProps = {
  data?: SimpleMenuData
}

const SimpleSiteMenu = ({ data, ...rest }: MenuProps) => {
  const router = useRouter()
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)
  const [indices, setIndices] = useState<number[]>([])
  const menuItems = (data && data.groups) || []
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
                <LogoLink />
                <MenuButton title="Menu" aria-expanded={true} expanded onClick={() => setIsOpen(false)}></MenuButton>
              </NavTopbar>
              <MenuContainer>
                <SimpleMenuWrapper index={indices} onChange={toggleItem}>
                  {menuItems?.map((item: SimpleGroupData, idx: number) => {
                    if (item?.type === 'simpleMenuGroup') {
                      return <SimpleMenuItem item={item} key={item.id} index={idx} />
                    } else if (item?.type === 'simpleMenuLink') {
                      // Is this really necessary?
                      if (item.link && !item.link.slug) {
                        console.warn('Missing slug for simple menu link')
                      }
                      return (
                        <li key={item.id}>
                          <NextLink href={(item.link && item.link.slug) || '/'} passHref>
                            <MenuLink variant="contentLink"> {item.label} </MenuLink>
                          </NextLink>
                        </li>
                      )
                    }
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
