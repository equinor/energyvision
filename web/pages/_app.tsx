import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GlobalStyle } from '../styles/globalStyles'
import { SkipNavLink } from '@reach/skip-nav'
import 'focus-visible'
import { useEffect } from 'react'
import { GTM_ID, pageview } from '../lib/gtm'
import Script from 'next/script'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../pageComponents/pageTemplates/ErrorFallback'
import { Flags } from '../common/helpers/datasetHelpers'
import useConsentState from '../lib/hooks/useConsentState'
import { loadSiteImproveScript, cleanUpSiteImproveScript } from '../pageComponents/SiteImprove'

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

const CookieBot = ({ locale }: { locale: string | undefined }) => (
  <Script
    src="https://consent.cookiebot.com/uc.js"
    id="Cookiebot"
    strategy="beforeInteractive"
    data-cbid="f1327b03-7951-45da-a2fd-9181babc783f"
    data-blockingmode="auto"
    data-culture={locale == 'no' ? 'nb' : locale || 'en'}
  />
)

/*
const GoogleConsentMode = () => (
  <Script
    id="gtag-consent"
    data-cookieconsent="ignore"
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("consent", "default", {
            ad_storage: "denied",
            analytics_storage: "denied",
            functionality_storage: "denied",
            personalization_storage: "denied",
            security_storage: "granted",
            wait_for_update: 500,
        });
        gtag("set", "ads_data_redaction", true);
      `,
    }}
  />
)

const GoogleTagManager = () => (
  <Script
    id="gtag-base"
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');`,
    }}
  />
)
*/

// Log errors to relevant services here
const HandleBoundaryError = (error: Error, info: { componentStack: string }) => {
  console.error('ErrorBoundary caught error: ', error, info)
}

function MyApp({ Component, pageProps }: CustomAppProps): JSX.Element {
  const router = useRouter()
  const getLayout = Component.getLayout || ((page: ReactNode): ReactNode => page)
  const IS_LIVE = process.env.NODE_ENV !== 'development'

  useEffect(() => {
    if (!GTM_ID) return

    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  useEffect(() => {
    if (window.self === window.top) {
      if (window?.Cookiebot) {
        try {
          window.Cookiebot?.runScripts()
        } catch (error) {
          console.error('An error occured while trying to run the Cookiebot script: ', error)
        }
      }
    }
  }, [router.asPath])

  useConsentState('statistics', loadSiteImproveScript, cleanUpSiteImproveScript)

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={HandleBoundaryError}>
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <GlobalStyle />
        <SkipNavLink />
        {IS_LIVE && <CookieBot locale={router.locale} />}
        {getLayout(<Component {...pageProps} />)}
      </>
    </ErrorBoundary>
  )
}

export default MyApp
