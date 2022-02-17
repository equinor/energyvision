import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { GlobalStyle, GlobalFontStyle } from '../styles/globalStyles'
import { DefaultSeo } from 'next-seo'
import { SkipNavLink } from '@reach/skip-nav'
import 'focus-visible'
import Script from 'next/script'
import { useEffect } from 'react'

// import archivedStyles from '@equinor/energyvision-legacy-css'
// import { AppInsightsContext, AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js'
// import { reactPlugin } from '../common'

/**
 * TODO:
 * - Figure out a way of not rendering legacyStyles on Sanity pages, See: isArchivePage at'../lib/archive/archiveUtils'
 * - Figure out how to add/use AppInsights without performance hit
 * - Get locale data from Sanity
 */

// eslint-disable-next-line no-unused-vars
type GetLayout = (page: ReactNode) => ReactNode

// eslint-disable-next-line @typescript-eslint/ban-types
type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout
}

// eslint-disable-next-line @typescript-eslint/ban-types
type CustomAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>
}

//COOKIEBOT
declare global {
  interface Window {
    Cookiebot: any
  }
}

function MyApp({ Component, pageProps }: CustomAppProps): JSX.Element {
  const router = useRouter()
  const getLayout = Component.getLayout || ((page: ReactNode): ReactNode => page)
  const isLocalhost = !!process.env.NEXT_PUBLIC_LOCALHOST

  useEffect(() => {
    if (window.self === window.top) {
      window.Cookiebot?.runScripts()
    }
  }, [router.asPath])

  return (
    <>
      <GlobalStyle />
      <GlobalFontStyle />

      <DefaultSeo dangerouslySetAllPagesToNoIndex={true} dangerouslySetAllPagesToNoFollow={true} />

      <SkipNavLink />
      {/* Cookie bot script should be the first in the document. Let it be here for now.*/}
      {!isLocalhost && (
        <Script
          src="https://consent.cookiebot.com/uc.js"
          id="Cookiebot"
          data-cbid="f1327b03-7951-45da-a2fd-9181babc783f"
          strategy="beforeInteractive"
          data-blockingmode="auto"
          data-culture={router.locale == 'no' ? 'nb' : router.locale}
        />
      )}
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default MyApp
