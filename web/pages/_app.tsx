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
import { GTM_ID, pageview } from '../lib/gtm'

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
  {
    /* useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events]) */
  }
  const getLayout = Component.getLayout || ((page: ReactNode): ReactNode => page)
  const isLocalhost = !!process.env.NEXT_PUBLIC_LOCALHOST

  useEffect(() => {
    if (window.self === window.top) {
      window.Cookiebot?.runScripts()
    }
  }, [router.asPath])

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://siteimproveanalytics.com/js/siteanalyze_6003171.js'
    script.async = true

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
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

      {/* GTM */}
      {/* <Script
        id="GTM"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      /> */}
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default MyApp
