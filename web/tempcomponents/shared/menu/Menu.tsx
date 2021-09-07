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
  /*   display: none; */

  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  height: 37rem;
  position: absolute;
  background-color: var(--ui-background-default);
  /* Temp. make it easier to see the menu */
  background-color: var(--slate-blue-60);

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

const TopLevelLink = styled(Link)`
  text-decoration: none;
  padding: var(--space-xSmall) var(--space-small);
  border-bottom: 2px solid var(--moss-green-80);
  &:focus + ${SubMenuPanel} {
    display: block;
  }
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

export const Menu = ({ slugs, data }: MenuProps) => {
  const [topbarHeight, setTopbarHeight] = useState(0)
  const { isOpen, closeMenu, openMenu, setActive, getActiveMenuItem, removeActive } = useMenu()
  const router = useRouter()
  const topbarRef = useCallback((node) => {
    if (node !== null) {
      const height = node.getBoundingClientRect().height
      setTopbarHeight(height)
    }
  }, [])

  const localization = {
    activeLocale: router.locale || 'en',
  }

  const handleRouteChange = () => {
    if (isOpen || getActiveMenuItem !== null) {
      closeMenu()
      removeActive()
    }
  }

  // @TODO: Has no dependency arrays, so not very optimized
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  })

  const menuItems = (data && data.subMenus) || []

  // @TODO: No, we will not do it like this!
  const openMenuItem = (linkName: string) => {
    openMenu()
    setActive(linkName)
  }
  const closeMenuItem = (linkName: string) => {
    if (getActiveMenuItem === linkName) {
      removeActive()
    }
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
                return (
                  <TopLevelItem
                    key={id}
                    onMouseEnter={() => openMenuItem(topLevelLink.label)}
                    onMouseLeave={() => closeMenuItem(topLevelLink.label)}
                  >
                    <div>
                      {/* @TODO: Should we allow external links at top level? */}
                      <NextLink href={getLink(topLevelLink)} passHref>
                        <TopLevelLink>{topLevelLink.label}</TopLevelLink>
                      </NextLink>
                      {group && group.length > 0 && (
                        <SubMenuPanel isOpen={isOpen && getActiveMenuItem === topLevelLink.label}>
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
