import { useState, useCallback } from 'react'
import { Topbar, Link } from '@components'
import NextLink from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'
import { LocalizationSwitch } from './LocalizationSwitch'
import { useRouter } from 'next/router'

const MenuWrapper = styled.div`
  margin: 0 auto;

  a {
    margin: 0 var(--space-medium) 0 0;

    &:last-of-type {
      margin: 0;
    }
  }
`
const TopLevelItem = styled(Link)`
  /* Just some bling to see the different
 */
  text-decoration: none;
  padding: var(--space-xSmall) var(--space-small);
  border-bottom: 2px solid var(--moss-green-80);
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
  console.log('Menu data', data)
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
          {data.map((topLevelItem: any) => {
            return (
              <NextLink href="/" passHref key={topLevelItem._id}>
                <TopLevelItem>{topLevelItem.label}</TopLevelItem>
              </NextLink>
            )
          })}
        </MenuWrapper>

        {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}
      </Topbar>
    </>
  )
}
