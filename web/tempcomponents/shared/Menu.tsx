import { useState, useCallback } from 'react'
import { Topbar, Link, List, Heading } from '@components'
import NextLink from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'
import { LocalizationSwitch } from './LocalizationSwitch'
import { useRouter } from 'next/router'
import type { MenuData, MenuLinkData } from '../../types/types'

const { Item } = List

const MenuWrapper = styled.div`
  margin: 0 auto;

  a {
    margin: 0 var(--space-medium) 0 0;
  }
`

const SubMenuPanel = styled.div`
  /* Nevermind about a11y at this point */
  /*  For the sake of quick and dirty, let's do the stupid hover interaction */
  display: none;
  position: absolute;
  background-color: var(--ui-background-default);
  padding: var(--space-large);
  left: 0;
  right: 0;
`

const TopLevelItem = styled(Item)`
  &:hover ${SubMenuPanel} {
    display: block;
  }
`

const TopLevelLink = styled(Link)`
  /* Just some bling to see the different
 */
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

  const menuItems = (data && data.subMenus) || []

  return (
    <>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        <MenuWrapper>
          {/* For testing state 
          <input placeholder="Search..." /> */}

          {menuItems && (
            <List unstyled style={{ display: 'inline-flex' }}>
              {menuItems.map((topLevelItem: any) => {
                const { topLevelLink, id, group } = topLevelItem
                return (
                  <TopLevelItem key={id}>
                    <div>
                      {/* @TODO: Should we allow external links at top level? */}
                      <NextLink href={getLink(topLevelLink)} passHref>
                        <TopLevelLink>{topLevelLink.label}</TopLevelLink>
                      </NextLink>
                      {group && group.length > 0 && (
                        <SubMenuPanel>
                          {topLevelItem.group.map((groupItem: any) => {
                            return (
                              <div key={groupItem.id}>
                                <Heading level="h3" size="sm" style={{ textTransform: 'uppercase' }}>
                                  {groupItem.label}
                                </Heading>
                                <List unstyled>
                                  {groupItem.links.map((link: any) => (
                                    <Item key={link.id}>
                                      <NextLink href={getLink(link)} passHref>
                                        <Link>{link.label}</Link>
                                      </NextLink>
                                    </Item>
                                  ))}
                                </List>
                              </div>
                            )
                          })}
                        </SubMenuPanel>
                      )}
                    </div>
                  </TopLevelItem>
                )
              })}
            </List>
          )}
        </MenuWrapper>

        {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}
      </Topbar>
    </>
  )
}
