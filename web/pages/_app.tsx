import type { AppProps /*, AppContext */ } from 'next/app'
import { Button } from '@components'
import { GlobalStyle } from '../styles/globalStyles'

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Button variant="outlined" onClick={toggleTheme}>
        Toggle theme
      </Button>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
