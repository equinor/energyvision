import type { AppProps /*, AppContext */ } from 'next/app'
import { Button } from '@components'
import { GlobalStyle } from 'styles/globalStyles'

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Button onClick={toggleTheme} label="Toggle theme" primary={false} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
