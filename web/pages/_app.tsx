import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GlobalStyle, GlobalFontStyle } from '../styles/globalStyles'
import '../styles/tailwind.css'
import { useEffect } from 'react'
import { GTM_ID, pageview } from '../lib/gtm'
import Script from 'next/script'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../pageComponents/pageTemplates/ErrorFallback'
import useConsentState from '../lib/hooks/useConsentState'
import { loadSiteImproveScript, cleanUpSiteImproveScript } from '../pageComponents/SiteImprove'
import { enableDynatrace, disableDynatrace } from '../pageComponents/Dynatrace'
import { SWRConfig } from 'swr'
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav'
import styled from 'styled-components'

// import archivedStyles from '@equinor/energyvision-legacy-css'
// import { AppInsightsContext, AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js'
// import { reactPlugin } from '../common'
import { PreviewContextProvider } from '../lib/contexts/PreviewContext'
import { defaultLanguage } from '../languages'

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
    data-culture={locale == 'no' ? 'nb' : locale || defaultLanguage.locale}
  />
)

// Log errors to relevant services here
const HandleBoundaryError = (error: Error, info: { componentStack: string }) => {
  console.error('ErrorBoundary caught error: ', error, info)
}

const StyledSkipLink = styled(SkipNavLink)`
  &:focus {
    background: white;
    padding: var(--space-medium);
    border: 1px solid black;
    position: sticky;
    border-radius: 7px;
    margin: var(--space-medium);
    top: 10%;
    z-index: 10;
  }
`

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

  const enableStatisticsCookies = () => {
    loadSiteImproveScript()
    enableDynatrace()
  }

  const disableStatisticsCookies = () => {
    cleanUpSiteImproveScript()
    disableDynatrace()
  }

  useConsentState('statistics', enableStatisticsCookies, disableStatisticsCookies)

  const GoogleTagManagerHead = () => (
    // eslint-disable-next-line @next/next/next-script-for-ga
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
    />
  )

  return (
    <SWRConfig>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={HandleBoundaryError}>
        <StyledSkipLink>Skip to Content</StyledSkipLink>
        <>
          <Head>
            <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
            {GTM_ID && <GoogleTagManagerHead />}
          </Head>
          <GlobalStyle />
          <GlobalFontStyle />
          {IS_LIVE && <CookieBot locale={router.locale} />}
          <PreviewContextProvider>
            <SkipNavContent>{getLayout(<Component {...pageProps} />)}</SkipNavContent>
          </PreviewContextProvider>
        </>
      </ErrorBoundary>
    </SWRConfig>
  )
}

export default MyApp
