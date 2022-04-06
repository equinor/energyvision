// The simple variant for the menu is used by the satellite sites

import { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { RemoveScroll } from 'react-remove-scroll'
import FocusLock from 'react-focus-lock'
import { FormattedMessage, useIntl } from 'react-intl'
import { SimpleMenuWrapper } from './SimpleMenuWrapper'
import { MenuButton, Link } from '@components'
import { SimpleMenuItem } from './SimpleMenuItem'
import NextLink from 'next/link'

import type { SimpleMenuData, SimpleGroupData } from '../../../../types/types'

import { TopbarDropdown } from '../TopbarDropdown'
import { LogoLink } from '../../LogoLink'
import { NavTopbar } from '../NavTopbar'

const MenuContainer = styled.div`
  font-size: var(--typeScale-1);
  background-color: transparent;
  padding: 0 var(--space-large);
`

// TODO: This needs to be looked at. Not optimal solution.
const MenuLink = styled(Link)`
  font-size: var(--typeScale-1);
  padding: calc(var(--space-small) + var(--space-small)) 0;
  svg {
    display: none;
  }
  &:hover {
    background-color: var(--grey-10);
  }
`
const AllSitesLink = styled(Link)`
  text-decoration: none;
  padding: calc(var(--space-small) + var(--space-small)) 0;
  &:hover {
    text-decoration: underline;
  }
`

export type MenuProps = {
  data?: SimpleMenuData
}

const SimpleSiteMenu = ({ data, ...rest }: MenuProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [indices, setIndices] = useState<number[]>([])
  const menuItems = (data && data.groups) || []
  const intl = useIntl()
  const handleRouteChange = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

  function onMenuButtonClick() {
    setIsOpen(!isOpen)
  }

  function toggleItem(toggledIndex: number) {
    // Small devices version
    if (indices.includes(toggledIndex)) {
      // This menu item is already open, so let's close it by removing it from the list
      const expandedItems = indices.filter((currentIndex) => currentIndex !== toggledIndex)
      return setIndices(expandedItems)
    }
    // Otherwise add it to the list
    setIndices([...indices, toggledIndex])
  }

  const title = intl.formatMessage({ id: 'menu', defaultMessage: 'Menu' })

  return (
    <>
      <MenuButton title={title} aria-expanded={isOpen} onClick={onMenuButtonClick} {...rest} />
      <FocusLock disabled={!isOpen} returnFocus>
        <RemoveScroll enabled={isOpen}>
          <TopbarDropdown isOpen={isOpen} className={RemoveScroll.classNames.zeroRight}>
            <nav>
              <NavTopbar>
                <LogoLink />
                <MenuButton title={title} aria-expanded={true} expanded onClick={() => setIsOpen(false)}></MenuButton>
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
                  <NextLink href="https://www.equinor.com/languages.html?language=en" passHref>
                    <AllSitesLink>
                      <FormattedMessage id="all_sites" defaultMessage="All sites" />
                    </AllSitesLink>
                  </NextLink>
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
