import { useState, useCallback } from 'react'
import { Topbar, Link, List, Heading } from '@components'
import NextLink from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'
import { LocalizationSwitch } from './LocalizationSwitch'
import { useRouter } from 'next/router'

const { Item } = List

const MenuWrapper = styled.div`
  margin: 0 auto;

  a {
    margin: 0 var(--space-medium) 0 0;

    &:last-of-type {
      margin: 0;
    }
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

export type MenuProps = {
  data?: any
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
  return (
    <>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        <MenuWrapper>
          <NextLink href="/en/careers" passHref>
            <Link>Careers</Link>
          </NextLink>
          <NextLink href="/en/news" passHref>
            <Link>News</Link>
          </NextLink>

          <NextLink href="/news/archive" passHref>
            <Link>Archive</Link>
          </NextLink>
          {/* For testing state 
          <input placeholder="Search..." /> */}

          {data && (
            <List unstyled style={{ display: 'inline-flex' }}>
              {data.map((topLevelItem: any) => {
                return (
                  <TopLevelItem key={topLevelItem.id}>
                    <div>
                      <NextLink href="/" passHref>
                        <TopLevelLink>{topLevelItem.label}</TopLevelLink>
                      </NextLink>
                      {topLevelItem.group && topLevelItem.group.length > 0 && (
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
                                      <NextLink href={link.slug} passHref>
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
