import { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { RemoveScroll } from 'react-remove-scroll'
import FocusLock from 'react-focus-lock'
import { Menu, MenuButton, Link } from '@components'
import { MenuGroup } from './MenuGroup'
import { TopbarDropdown } from './TopbarDropdown'
import { MenuContainer } from './MenuContainer'
import { NavTopbar } from './NavTopbar'
import { getAllSitesLink } from '../../../common/helpers/getAllSitesLink'

import { LogoLink } from '../LogoLink'

import type { MenuData, SubMenuData } from '../../../types/types'
import { FormattedMessage, useIntl } from 'react-intl'

const AllSitesLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  margin: var(--space-small) 0 0 0;
  color: var(--grey-80);
  &:hover {
    background-color: var(--grey-10);
  }
  padding: calc(var(--space-small) + var(--space-xSmall)) 0;
  @media (min-width: 700px) {
    margin: var(--space-small) 0 0 var(--menu-paddingHorizontal);
    width: var(--minViewportWidth);
  }

  @media (min-width: 1300px) {
    display: inline-flex;
    border-left: 2px solid var(--white-100);
    padding: var(--space-large) var(--space-large);
    width: fit-content;
    margin: 0;
  }
`

export type MenuProps = {
  data?: MenuData
}

const SiteMenu = ({ data, ...rest }: MenuProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()

  const handleRouteChange = useCallback(() => {
    setIsOpen(false)
  }, [])
  const menuItems = (data && data.subMenus) || []

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

  function onMenuButtonClick() {
    setIsOpen(!isOpen)
  }

  const title = intl.formatMessage({ id: 'menu', defaultMessage: 'Menu' })
  const allSitesURL = getAllSitesLink('internal', router?.locale || 'en')

  return (
    <>
      <MenuButton title={title} aria-expanded={isOpen} onClick={onMenuButtonClick} {...rest} />
      <FocusLock disabled={!isOpen} returnFocus>
        <RemoveScroll enabled={isOpen}>
          <TopbarDropdown isOpen={isOpen} className={RemoveScroll.classNames.zeroRight} background={'White'}>
            {isOpen && (
              <nav>
                <NavTopbar>
                  <LogoLink />
                  <MenuButton title={title} aria-expanded={true} expanded onClick={() => setIsOpen(false)}></MenuButton>
                </NavTopbar>
                <MenuContainer>
                  <Menu>
                    {menuItems.map((topLevelItem: SubMenuData, idx) => {
                      return <MenuGroup key={topLevelItem.id} index={idx} topLevelItem={topLevelItem} />
                    })}
                  </Menu>
                  <AllSitesLink href={allSitesURL}>
                    <FormattedMessage id="all_sites" defaultMessage="All sites" />
                  </AllSitesLink>
                </MenuContainer>
              </nav>
            )}
          </TopbarDropdown>
        </RemoveScroll>
      </FocusLock>
    </>
  )
}
export default SiteMenu
