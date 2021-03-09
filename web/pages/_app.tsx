import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import { Button, Topbar } from '@components'
import { GlobalStyle } from '../styles/globalStyles'

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
      </Head>
      <GlobalStyle />
      <Topbar>
        <Button variant="outlined" onClick={toggleTheme}>
          Toggle theme
        </Button>
      </Topbar>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
