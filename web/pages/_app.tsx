import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import { useState, useCallback } from 'react'
import { IntlProvider } from 'react-intl'
import { Button, Topbar, Menu } from '@components'
import { GlobalStyle } from '../styles/globalStyles'
import { createGlobalStyle } from 'styled-components'
import { MockMenuData } from '@mockdata'
import { DefaultSeo } from 'next-seo'
import '@equinor/energyvision-legacy-css/dist/css/legacy.minified.css';


const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [topbarHeight, setTopbarHeight] = useState(0)
  const TopbarOffset = createGlobalStyle`
    #__next { margin-top: ${topbarHeight}px}
  `

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
        <GlobalStyle />
        <DefaultSeo dangerouslySetAllPagesToNoIndex={true} dangerouslySetAllPagesToNoFollow={true} />
        <TopbarOffset />

        <Topbar height={topbarHeight} ref={topbarRef}>
          <Menu items={MockMenuData} offset={topbarHeight}></Menu>
          <Button variant="outlined" onClick={toggleTheme}>
            Toggle theme
          </Button>
        </Topbar>

        <Component {...pageProps} />
      </IntlProvider>
    </>
  )
}

export default MyApp
