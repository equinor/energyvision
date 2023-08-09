import { GetServerSideProps } from 'next'
import { InstantSearchSSRProvider } from 'react-instantsearch-hooks-web'
import { getServerState } from 'react-instantsearch-hooks-server'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import Footer from '../../pageComponents/shared/Footer'
import Header from '../../pageComponents/shared/Header'
import { newsroomQuery } from '../../lib/queries/newsroom'
import getIntl from '../../common/helpers/getIntl'
import { getNameFromLocale, getIsoFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import NewsRoomPage from '../../pageComponents/pageTemplates/NewsRoomPage'
import { AlgoliaIndexPageType, NewsRoomPageType } from '../../types'
import { getComponentsData } from '../../lib/fetchData'
import { renderToString } from 'react-dom/server'

export default function NorwegianNewsRoom({ serverState, data, url }: AlgoliaIndexPageType) {
  const defaultLocale = defaultLanguage.locale
  const { pageData, slug, intl } = data
  const locale = intl?.locale || defaultLocale

  return (
    <InstantSearchSSRProvider {...serverState}>
      <IntlProvider
        locale={getIsoFromLocale(locale)}
        defaultLocale={getIsoFromLocale(defaultLocale)}
        messages={intl?.messages}
      >
        <NewsRoomPage locale={locale} pageData={pageData as NewsRoomPageType} slug={slug} url={url} />
      </IntlProvider>
    </InstantSearchSSRProvider>
  )
}

NorwegianNewsRoom.getLayout = (page: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props
  const slugs = [
    { slug: '/news', lang: 'en_GB' },
    { slug: '/nyheter', lang: 'nb_NO' },
  ]
  const defaultLocale = defaultLanguage.locale
  const locale = data?.intl?.locale || defaultLocale

  return (
    <IntlProvider
      locale={getIsoFromLocale(locale)}
      defaultLocale={getIsoFromLocale(defaultLocale)}
      messages={data?.intl?.messages}
    >
      <>
        <Header slugs={slugs} menuData={data?.menuData} />
        {page}
        <Footer footerData={data?.footerData} />
      </>
    </IntlProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, preview = false, locale = 'no' }) => {
  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not Norwegian.
  // This is a hack, and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485
  if (locale !== 'no') {
    return {
      notFound: true,
    }
  }

  const lang = getNameFromLocale(locale)
  const intl = await getIntl(locale, false)

  const url = new URL(req.headers.referer || `https://${req.headers.host}${req.url}`).toString()
  const queryParams = {
    lang,
  }

  const slug = req.url

  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query: newsroomQuery,
      queryParams,
    },
    preview,
  )

  const serverState = await getServerState(
    <NorwegianNewsRoom
      data={{
        intl,
        pageData,
        slug,
      }}
      url={url}
    />,
    { renderToString },
  )

  return {
    props: {
      locale,
      serverState,
      url,
      data: {
        menuData,
        footerData,
        intl,
        pageData,
        slug,
      },
    },
  }
}
