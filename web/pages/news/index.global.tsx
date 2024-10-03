import { GetServerSideProps } from 'next'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { renderToString } from 'react-dom/server'
import Footer from '../../pageComponents/shared/Footer'
import Header from '../../pageComponents/shared/Header'
import { getNewsByFilters, allNewsDocuments, newsroomQuery } from '../../lib/queries/newsroom'
import getIntl from '../../common/helpers/getIntl'
import { getNameFromLocale, getIsoFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import { AlgoliaIndexPageType, NewsRoomPageType } from '../../types'
import { getComponentsData, getNewsroomData } from '../../lib/fetchData'
import NewsRoomTemplate from '@templates/newsroom/Newsroom'
import { formatNewsroomQueryFilter, isNotEmpty } from '../../pages/api/news/selection'
import { getServerState, InstantSearchSSRProvider } from 'react-instantsearch'

export default function NewsRoom({ serverState, isServerRendered = false, data, url }: AlgoliaIndexPageType) {
  const defaultLocale = defaultLanguage.locale
  const { pageData, slug, intl } = data
  const locale = data?.intl?.locale || defaultLocale
  console.log('serverstate', serverState)

  return (
    <InstantSearchSSRProvider {...serverState}>
      <IntlProvider
        locale={getIsoFromLocale(locale)}
        defaultLocale={getIsoFromLocale(defaultLocale)}
        messages={intl?.messages}
      >
        <NewsRoomTemplate
          isServerRendered={isServerRendered}
          url={url}
          locale={locale}
          pageData={pageData as NewsRoomPageType}
          slug={slug}
        />
      </IntlProvider>
    </InstantSearchSSRProvider>
  )
}

NewsRoom.getLayout = (page: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props

  // Too hardcoded?
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

export const getServerSideProps: GetServerSideProps = async ({ req, preview = false, locale = 'en', query }) => {
  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not English.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485

  if (locale !== 'en') {
    return {
      notFound: true,
    }
  }

  const lang = getNameFromLocale(locale)
  const intl = await getIntl(locale, false)
  let queryParams = {
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

  let newsList = []
  console.log('Has query', query)
  if (query?.topic || query?.country || query?.year) {
    const { topic, country, year } = formatNewsroomQueryFilter(query)

    queryParams = {
      ...queryParams,
      tags: topic,
      countryTags: country,
      years: year,
    }

    const newsGroq = getNewsByFilters(isNotEmpty(topic), isNotEmpty(country), isNotEmpty(year), false, false)
    console.log('Fetch news selection on', newsGroq)
    console.log('Fetch queryparams', queryParams)
    console.log(`return news on topic ${topic.toString()}, country: ${country.toString()}, year: ${year.toString()}`)
    const { data } = await getNewsroomData({
      query: newsGroq,
      queryParams,
    })

    newsList = data
  } else {
    const { data } = await getNewsroomData({
      query: allNewsDocuments,
      queryParams,
    })
    newsList = data
  }

  const url = new URL(req.headers.referer || `https://${req.headers.host}${req.url}`).toString()
  console.log('url', url)
  const serverState = await getServerState(
    <NewsRoom
      isServerRendered
      data={{
        intl,
        pageData: {
          ...pageData,
          news: newsList,
        },
        slug,
      }}
      url={url}
    />,
    { renderToString },
  )

  console.log('returning serverState', serverState)
  return {
    props: {
      serverState,
      url,
      data: {
        menuData,
        footerData,
        intl,
        pageData: {
          ...pageData,
          news: newsList,
        },
        slug,
      },
    },
  }
}
