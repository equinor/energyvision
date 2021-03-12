import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import { useState, useCallback } from 'react'
import { Button, Topbar, Menu } from '@components'
import { GlobalStyle } from '../styles/globalStyles'
import { createGlobalStyle } from 'styled-components'
import { MockMenuData } from '../components/stories/components/mockData/menu'

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

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
      </Head>
      <GlobalStyle />
      <TopbarOffset />

      <Topbar height={topbarHeight} ref={topbarRef}>
        <Menu items={MockMenuData} offset={topbarHeight}></Menu>
        <Button variant="outlined" onClick={toggleTheme}>
          Toggle theme
        </Button>
      </Topbar>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
