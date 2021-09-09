import { useState, useCallback, useEffect } from 'react'
import { Topbar, Link, List, Heading } from '@components'
import NextLink from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'
import { LocalizationSwitch } from '../LocalizationSwitch'
import { useRouter } from 'next/router'
import { useMenu } from './MenuProvider'
import type { MenuData, MenuLinkData } from '../../../types/types'

const { Item } = List

const MenuWrapper = styled.div`
  margin: 0 auto;

  a {
    margin: 0 var(--space-medium) 0 0;
  }
`

type SubMenuPanelProps = {
  isOpen: boolean
}
const SubMenuPanel = styled.div<SubMenuPanelProps>`
  /* Nevermind about a11y at this point */
  /*  For the sake of quick and dirty, let's do the stupid hover interaction */
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: opacity 0.19s linear 0.2s, visibility 0ms 0.4s;

  height: 37rem;
  position: absolute;
  background-color: var(--ui-background-default);
  /* Temp. make it easier to see the menu */
  background-color: var(--grey-20);

  padding: var(--space-large);
  left: 0;
  right: 0;
`

const SubMenuContent = styled.div`
  display: flex;
`

const WrappedList = styled(List)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 35rem;
`

const ListGroup = styled.div``

const TopLevelList = styled(List)`
  display: inline-flex;
  flex-wrap: wrap;
`

const TopLevelItem = styled(Item)``

type TopLevelLinkProps = {
  active: boolean
}

const TopLevelLink = styled(Link)<TopLevelLinkProps>`
  text-decoration: none;
  padding: var(--space-xSmall) var(--space-small);
  border-bottom: ${(props) => (props.active ? '2px solid var(--moss-green-80)' : '2px solid transparent ')};
`

const TopbarOffset = createGlobalStyle<{ topbarHeight: number }>`
  #__next {
    margin-top: ${({ topbarHeight }) => topbarHeight && `${topbarHeight}px`}
  }
`

function getLink(linkData: MenuLinkData) {
  const { isStatic, link, staticUrl } = linkData
  if (isStatic) {
    //  @TODO: Can we add a required validation for the conditional field
    return staticUrl || '/boom-static'
  } else {
    return (link && link.slug) || '/boom-reference'
  }
}

export type MenuProps = {
  data?: MenuData
  slugs?: {
    en_GB: string
    nb_NO: string
  }
}

const fetchTopLevel = (route: string) => {
  if (!route) return null
  const path = route.split('/')
  return path[1]
}

const getInitialMenuItem = (router: any) => {
  return fetchTopLevel(router.asPath)
}

export const Menu = ({ slugs, data }: MenuProps) => {
  const [topbarHeight, setTopbarHeight] = useState(0)
  const router = useRouter()
  const { isOpen, closeMenu, openMenu, setActive, getActiveMenuItem, removeActive } = useMenu()
  const [activeMenuItem, setActiveMenuItem] = useState(getInitialMenuItem(router))
  const topbarRef = useCallback((node) => {
    if (node !== null) {
      const height = node.getBoundingClientRect().height
      setTopbarHeight(height)
    }
  }, [])

  const localization = {
    activeLocale: router.locale || 'en',
  }

  const handleRouteChange = useCallback((url) => {
    closeMenu()
    removeActive()

    setActiveMenuItem(fetchTopLevel(url))
  }, [])

  // @TODO: We need something like this to do things when the user navigates
  useEffect(() => {
    router.events.on('routeChangeComplete', (url) => handleRouteChange(url))
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

  const menuItems = (data && data.subMenus) || []

  // @TODO: No, we will not do it like this!
  const openMenuItem = (linkName: string) => {
    openMenu()
    setActive(linkName)
  }
  const closeMenuItem = (linkName: string) => {
    /*  if (getActiveMenuItem === linkName) { */
    removeActive()
    /*  } */
    closeMenu()
  }

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
                const { topLevelLink, id, group } = topLevelItem
                const topLevelHref = getLink(topLevelLink)
                const activePanel = isOpen && getActiveMenuItem === topLevelLink.label
                return (
                  <TopLevelItem
                    key={id}
                    onMouseEnter={() => openMenuItem(topLevelLink.label)}
                    onMouseLeave={() => closeMenuItem(topLevelLink.label)}
                  >
                    <div>
                      {/* @TODO: Should we allow external links at top level? */}
                      <NextLink href={topLevelHref} passHref>
                        <TopLevelLink active={activeMenuItem === fetchTopLevel(topLevelHref)}>
                          {topLevelLink.label}
                        </TopLevelLink>
                      </NextLink>
                      {group && group.length > 0 && (
                        <SubMenuPanel isOpen={activePanel}>
                          <SubMenuContent>
                            {topLevelItem.group.map((groupItem: any) => {
                              return (
                                <ListGroup key={groupItem.id}>
                                  <Heading level="h3" size="sm" style={{ textTransform: 'uppercase' }}>
                                    {groupItem.label}
                                  </Heading>
                                  <WrappedList unstyled>
                                    {groupItem.links.map((link: any) => (
                                      <Item key={link.id}>
                                        <NextLink href={getLink(link)} passHref>
                                          <Link>{link.label}</Link>
                                        </NextLink>
                                      </Item>
                                    ))}
                                  </WrappedList>
                                </ListGroup>
                              )
                            })}
                          </SubMenuContent>
                        </SubMenuPanel>
                      )}
                    </div>
                  </TopLevelItem>
                )
              })}
            </TopLevelList>
          )}
        </MenuWrapper>

        {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}
      </Topbar>
    </>
  )
}
