import type { AppProps /*, AppContext */ } from 'next/app'
import { Button, Topbar } from '@components'
import { GlobalStyle } from '../styles/globalStyles'

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
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
