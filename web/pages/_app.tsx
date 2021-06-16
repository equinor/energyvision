import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useCallback } from 'react'
import { IntlProvider } from 'react-intl'
import { Topbar, Link } from '@components'
import { GlobalStyle } from '../styles/globalStyles'
import styled, { createGlobalStyle } from 'styled-components'
import { DefaultSeo } from 'next-seo'
import NextLink from 'next/link'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// TODO fix the eslint issues
import archivedStyles from '@equinor/energyvision-legacy-css/dist/css/legacy.minified.css'
import { isArchivePage } from '../lib/archive/archiveUtils'

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

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [topbarHeight, setTopbarHeight] = useState(0)
  const router = useRouter()
  const topbarRef = useCallback((node) => {
    if (node !== null) {
      const height = node.getBoundingClientRect().height
      setTopbarHeight(height)
    }
  }, [])

  // TODO: get locale from Sanity
  return (
    <>
      <IntlProvider locale="en" defaultLocale="en">
        <Head>
          {/* TODO: load the font in a better way */}
          <link rel="stylesheet" href="https://eds-static.equinor.com/font/equinor-font.css" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        </Head>
        {/* TODO: Find out why this works in the news-archive branch and not here */}
        {isArchivePage(router.asPath) && (
          <style jsx global>
            {archivedStyles}
          </style>
        )}
        <GlobalStyle />
        <DefaultSeo dangerouslySetAllPagesToNoIndex={true} dangerouslySetAllPagesToNoFollow={true} />
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
        </Topbar>

        <Component {...pageProps} />
      </IntlProvider>
    </>
  )
}

export default MyApp
