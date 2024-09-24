import { GetServerSideProps } from 'next'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import Footer from '../../pageComponents/shared/Footer'
import Header from '../../pageComponents/shared/Header'
import {
  allNewsCountryTags,
  allNewsDocuments,
  allNewsTopicTags,
  allNewsYearTags,
  getNewsDocuments,
  newsroomQuery,
} from '../../lib/queries/newsroom'
import getIntl from '../../common/helpers/getIntl'
import { getNameFromLocale, getIsoFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import { AlgoliaIndexPageType, NewsRoomPageType } from '../../types'
import { getComponentsData, getNewsroomData } from '../../lib/fetchData'
import NewsRoomTemplate from '@templates/newsroom/Newsroom'
import { findGroqOnNewsroomFilters, formatNewsroomQueryFilter } from 'pages/api/news/selection'

export default function NewsRoom({ data }: AlgoliaIndexPageType) {
  const defaultLocale = defaultLanguage.locale
  const { pageData, slug, intl } = data
  const locale = data?.intl?.locale || defaultLocale

  return (
    <IntlProvider
      locale={getIsoFromLocale(locale)}
      defaultLocale={getIsoFromLocale(defaultLocale)}
      messages={intl?.messages}
    >
      <NewsRoomTemplate locale={locale} pageData={pageData as NewsRoomPageType} slug={slug} />
    </IntlProvider>
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
  const [{ data: topicTags }, { data: countryTags }, { data: yearTags }] = await Promise.all([
    getNewsroomData({
      query: allNewsTopicTags,
      queryParams,
    }),
    getNewsroomData({
      query: allNewsCountryTags,
      queryParams,
    }),
    getNewsroomData({
      query: allNewsYearTags,
      queryParams,
    }),
  ])

  const filteredYearTags = yearTags?.filter((n: string) => n)
  const uniqueYears = [...new Set<string>(filteredYearTags)]?.map((year: string) => {
    return {
      key: year,
      title: year,
      connectedNews: filteredYearTags.filter((y: string) => y === year)?.length,
    }
  })

  let newsList = []
  if (query) {
    const { topic, country, year } = formatNewsroomQueryFilter(query)
    const { data } = await getNewsroomData({
      query: findGroqOnNewsroomFilters(topic, country, year),
      queryParams: {
        ...queryParams,
        tags: topic,
        countryTags: country,
        years: year,
      },
    })
    console.log(`return news on topic ${topic.toString()}, country: ${country.toString()}, year: ${year.toString()}`)
    newsList = data
  } else {
    const { data } = await getNewsroomData({
      query: getNewsDocuments(),
      queryParams,
    })
    newsList = data
  }
  const sortedNewsList = newsList.sort((a: any, b: any) => new Date(b.publishDateTime) - new Date(a.publishDateTime))

  return {
    props: {
      data: {
        menuData,
        footerData,
        intl,
        pageData: {
          ...pageData,
          tags: {
            topic: topicTags,
            country: countryTags,
            year: uniqueYears,
          },
          news: sortedNewsList,
        },
        slug,
      },
    },
  }
}
