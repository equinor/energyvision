import { useState, useCallback } from 'react'
import { Topbar, List } from '@components'
import styled, { createGlobalStyle } from 'styled-components'
import { LocalizationSwitch } from '../LocalizationSwitch'
import { SubMenu } from './SubMenu'
import { useRouter } from 'next/router'
/* import { useMenu } from './MenuProvider' */
import type { MenuData } from '../../../types/types'

const MenuWrapper = styled.div`
  margin: 0 auto;

  a {
    margin: 0 var(--space-medium) 0 0;
  }
`

const TopLevelList = styled(List)`
  display: inline-flex;
  flex-wrap: wrap;
`

const TopbarOffset = createGlobalStyle<{ topbarHeight: number }>`
  #__next {
    margin-top: ${({ topbarHeight }) => topbarHeight && `${topbarHeight}px`}
  }
`

export type MenuProps = {
  data?: MenuData
  slugs?: {
    en_GB: string
    nb_NO: string
  }
}

/* const fetchTopLevel = (route: string) => {
  if (!route) return null
  const path = route.split('/')
  return path[1]
}
 */
/* const getInitialMenuItem = (router: any) => {
  return fetchTopLevel(router.asPath)
}
 */
export const Menu = ({ slugs, data }: MenuProps) => {
  const [topbarHeight, setTopbarHeight] = useState(0)
  const router = useRouter()
  /* const { isOpen, closeMenu, openMenu, setActive, getActiveMenuItem, removeActive } = useMenu() */
  /*   const [activeMenuItem, setActiveMenuItem] = useState(getInitialMenuItem(router)) */
  const topbarRef = useCallback((node) => {
    if (node !== null) {
      const height = node.getBoundingClientRect().height
      setTopbarHeight(height)
    }
  }, [])

  const localization = {
    activeLocale: router.locale || 'en',
  }

  /* const handleRouteChange = useCallback((url) => {
    closeMenu()
    removeActive()

    setActiveMenuItem(fetchTopLevel(url))
  }, [])
 */
  // @TODO: We need something like this to do things when the user navigates
  /*   useEffect(() => {
    router.events.on('routeChangeComplete', (url) => handleRouteChange(url))
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange]) */

  const menuItems = (data && data.subMenus) || []
  return (
    <>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        <MenuWrapper>
          {/* For testing state 
          <input placeholder="Search..." /> */}

          {menuItems && (
            <TopLevelList unstyled>
              {menuItems.map((topLevelItem: any) => {
                return <SubMenu key={topLevelItem.id} {...topLevelItem} />
              })}
            </TopLevelList>
          )}
        </MenuWrapper>

        {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}
      </Topbar>
    </>
  )
}
