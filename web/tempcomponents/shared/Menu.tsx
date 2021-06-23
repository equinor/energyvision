import { useState, useCallback } from 'react'
import { Topbar, Link, Button } from '@components'
import NextLink from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'

const MenuWrapper = styled.div`
  margin: 0 auto;

  a {
    margin: 0 var(--space-medium) 0 0;

    &:last-of-type {
      margin: 0;
    }
  }
`

const TopbarOffset = createGlobalStyle<{ topbarHeight: number }>`
  #__next {
    margin-top: ${({ topbarHeight }) => topbarHeight && `${topbarHeight}px`}
  }
`

const LanguageSwitch = styled.div`
  a {
    margin: 0 var(--space-xSmall);
  }
`

export type MenuProps = {
  localization?: {
    activeLocale: string | undefined
    slugs: {
      en_GB: string
      nb_NO: string
    }
  }
}

export const Menu = ({ localization }: MenuProps) => {
  const [topbarHeight, setTopbarHeight] = useState(0)
  const topbarRef = useCallback((node) => {
    if (node !== null) {
      const height = node.getBoundingClientRect().height
      setTopbarHeight(height)
    }
  }, [])

  return (
    <>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        <MenuWrapper>
          <NextLink href="/" passHref>
            <Link>Home</Link>
          </NextLink>

          <NextLink href="/news" passHref>
            <Link>News</Link>
          </NextLink>

          <NextLink href="/news/archive" passHref>
            <Link>Archive</Link>
          </NextLink>
        </MenuWrapper>

        {localization && (
          <LanguageSwitch>
            <NextLink href={localization.slugs.en_GB} locale="en" passHref>
              <Button variant={localization.activeLocale == 'en' ? 'outlined' : 'ghost'}>EN</Button>
            </NextLink>
            |
            <NextLink href={localization.slugs.nb_NO} locale="no" passHref>
              <Button variant={localization.activeLocale == 'no' ? 'outlined' : 'ghost'}>NO</Button>
            </NextLink>
          </LanguageSwitch>
        )}
      </Topbar>
    </>
  )
}
