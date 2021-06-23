import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { IntlProvider } from 'react-intl'
import { GlobalStyle } from '../styles/globalStyles'
import { DefaultSeo } from 'next-seo'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// TODO fix the eslint issues
import archivedStyles from '@equinor/energyvision-legacy-css/dist/css/legacy.minified.css'
import { isArchivePage } from '../lib/archive/archiveUtils'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()

  // TODO: get locale from Sanity
  return (
    <>
      <IntlProvider locale="en" defaultLocale="en">
        <Head>
          {/* TODO: load the font in a better way */}
          <link rel="stylesheet" href="https://eds-static.equinor.com/font/equinor-font.css" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        </Head>
        {/* TODO: Find out why this works in the news-archive branch and not here */}
        {isArchivePage(router.asPath) && (
          <style jsx global>
            {archivedStyles}
          </style>
        )}
        <GlobalStyle />
        <DefaultSeo dangerouslySetAllPagesToNoIndex={true} dangerouslySetAllPagesToNoFollow={true} />

        <Component {...pageProps} />
      </IntlProvider>
    </>
  )
}

export default MyApp
