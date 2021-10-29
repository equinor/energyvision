import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { GlobalStyle, GlobalFontStyle } from '../styles/globalStyles'
import { DefaultSeo } from 'next-seo'
import { SkipNavLink } from '@reach/skip-nav'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// TODO fix the eslint issues
/* import archivedStyles from '@equinor/energyvision-legacy-css' */
/* import MenuProvider from '../tempcomponents/shared/menu/MenuProvider' */
/* 
import { AppInsightsContext, AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js'
import { reactPlugin } from '../common' */

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
      {/*   <AppInsightsErrorBoundary onError={() => <h1>I believe something went wrong</h1>} appInsights={reactPlugin}>
        <AppInsightsContext.Provider value={reactPlugin}> */}
      <IntlProvider locale={locale} defaultLocale={defaultLocale}>
        {/*       <MenuProvider> */}

        {/* 
                @TODO: Figure out a way of not rendering this on Sanity pages
                See: isArchivePage at'../lib/archive/archiveUtils'
              */}

        <GlobalStyle />
        <GlobalFontStyle />
        {/*   <style jsx global>
          {archivedStyles}
        </style> */}
        <DefaultSeo dangerouslySetAllPagesToNoIndex={true} dangerouslySetAllPagesToNoFollow={true} />
        <SkipNavLink />

        {getLayout(<Component {...pageProps} />)}
        {/*      </MenuProvider> */}
      </IntlProvider>
      {/*      </AppInsightsContext.Provider>
      </AppInsightsErrorBoundary> */}
    </>
  )
}

export default MyApp
