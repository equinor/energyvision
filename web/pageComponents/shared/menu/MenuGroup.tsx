import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import NextLink from 'next/link'
import { Link, List, Heading, Menu } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'

const { SubMenu, SubMenuHeader, SubMenuPanel } = Menu
const { Item } = List

const TopLevelItem = styled(Item)``

type SubMenuPanelProps = {
  isOpen: boolean
}

const SubMenuContent = styled.div`
  display: flex;
`

const WrappedList = styled(List)`
  /*   display: flex;
  flex-direction: column;
  flex-wrap: wrap; 
  max-height: 35rem;*/
`

type TopLevelLinkProps = {
  active: boolean
}

const TopLevelLink = styled(Link)<TopLevelLinkProps>`
  text-decoration: none;
  padding: var(--space-xSmall) var(--space-small);
  border-bottom: ${(props) => (props.active ? '2px solid var(--moss-green-80)' : '2px solid transparent ')};
`

const ListGroup = styled.div``

/* const SubMenuPanel = styled.div<SubMenuPanelProps>`

  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: opacity 0.19s linear 0.2s, visibility 0ms 0.4s;

  height: 37rem;
  position: absolute;
  background-color: var(--ui-background-default);
 
  background-color: var(--grey-20);

  padding: var(--space-large);
  left: 0;
  right: 0;
`
 */
function getLink(linkData: MenuLinkData) {
  if (!linkData) return 'something-wrong'
  const { isStatic, link, staticUrl } = linkData
  if (isStatic) {
    //  @TODO: Can we add a required validation for the conditional field
    return staticUrl || '/boom-static'
  } else {
    return (link && link.slug) || '/boom-reference'
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

export const MenuGroup = (topLevelItem: SubMenuData) => {
  const router = useRouter()
  const { topLevelLink, group } = topLevelItem
  const topLevelHref = getLink(topLevelLink)

  return (
    <SubMenu>
      <div>
        <SubMenuHeader> {topLevelLink?.label || 'Error'}</SubMenuHeader>
        {/* @TODO: Should we allow external links at top level? */}
        <SubMenuPanel>
          <NextLink href={topLevelHref} passHref>
            <TopLevelLink active={false} /* active={activeMenuItem === fetchTopLevel(topLevelHref)} */>
              {`${topLevelLink?.label} overview page` || 'Error'}
            </TopLevelLink>
          </NextLink>
          {group && group.length > 0 && (
            <SubMenuContent>
              {group.map((groupItem: SubMenuGroupData) => {
                return (
                  <ListGroup key={groupItem.id}>
                    <Heading level="h3" size="sm" style={{ textTransform: 'uppercase' }}>
                      {groupItem.label}
                    </Heading>
                    <WrappedList unstyled>
                      {groupItem.links.map((link: MenuLinkData) => (
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
          )}
        </SubMenuPanel>
      </div>
    </SubMenu>
  )
}
