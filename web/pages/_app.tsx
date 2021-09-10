import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { IntlProvider } from 'react-intl'
import { GlobalStyle } from '../styles/globalStyles'
import { DefaultSeo } from 'next-seo'
/* import MenuProvider from '../tempcomponents/shared/menu/MenuProvider' */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// TODO fix the eslint issues
import archivedStyles from '@equinor/energyvision-legacy-css/dist/css/legacy.minified.css'
import { AppInsightsContext, AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js'
import { reactPlugin } from '../common'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()
  const defaultLocale = router.defaultLocale || 'en'
  const locale = router.locale || defaultLocale
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page)
  // TODO: get locale from Sanity
  return (
    <>
      <AppInsightsErrorBoundary onError={() => <h1>I believe something went wrong</h1>} appInsights={reactPlugin}>
        <AppInsightsContext.Provider value={reactPlugin}>
          <IntlProvider locale={locale} defaultLocale={defaultLocale}>
            {/*       <MenuProvider> */}
            <Head>
              {/* TODO: load the font in a better way */}
              {/* <link rel="stylesheet" href="https://eds-static.equinor.com/font/equinor-font.css" /> */}
              <link rel="stylesheet" href="https://eds-static.equinor.com/font/equinor-uprights-vf.css" />

              <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
              <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
            </Head>
            {/* TODO: Find out why this works in the news-archive branch and not here */}

            {/* 
                @TODO: Figure out a way of not rendering this on Sanity pages
                See: isArchivePage at'../lib/archive/archiveUtils'
              */}
            <style jsx global>
              {archivedStyles}
            </style>
            <GlobalStyle />
            <DefaultSeo dangerouslySetAllPagesToNoIndex={true} dangerouslySetAllPagesToNoFollow={true} />

            {/* <Component {...pageProps} /> */}
            {getLayout(<Component {...pageProps} />)}
            {/*      </MenuProvider> */}
          </IntlProvider>
        </AppInsightsContext.Provider>
      </AppInsightsErrorBoundary>
    </>
  )
}

export default MyApp
