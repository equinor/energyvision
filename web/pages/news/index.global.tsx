import { GetStaticProps } from 'next'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import Footer from '../../sections/Footer/Footer'
import Header from '../../sections/Header/Header'
import { renderToString } from 'react-dom/server'
import { newsroomQuery } from '../../lib/queries/newsroom'
import getIntl from '../../common/helpers/getIntl'
import { getNameFromLocale, getIsoFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import { AlgoliaIndexPageType, NewsRoomPageType } from '../../types'
import { getComponentsData } from '../../lib/fetchData'
import NewsRoomTemplate from '@templates/newsroom/Newsroom'
import { getServerState, InstantSearchSSRProvider } from 'react-instantsearch'
import { Flags } from '../../common/helpers/datasetHelpers'
import algoliasearch from 'algoliasearch/lite'
import { algolia } from '../../lib/config'
import { ClientPerspective } from 'next-sanity'

export default function NewsRoom({ data, serverState }: AlgoliaIndexPageType) {
  const defaultLocale = defaultLanguage.locale
  const { pageData, slug, intl } = data
  const locale = data?.intl?.locale || defaultLocale

  return (
    <InstantSearchSSRProvider {...serverState}>
      <IntlProvider
        locale={getIsoFromLocale(locale)}
        defaultLocale={getIsoFromLocale(defaultLocale)}
        messages={intl?.messages}
      >
        <NewsRoomTemplate
          locale={locale}
          pageData={pageData as NewsRoomPageType}
          initialSearchResponse={data.response}
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
      <div className="pt-topbar">
        {/*@ts-ignore: TODO */}
        <Header slugs={slugs} menuData={data?.menuData} />
        {page}
        <Footer footerData={data?.footerData} />
      </div>
    </IntlProvider>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false, locale = 'en', previewData }) => {
  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not English.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485
  // Only build when newsroom allowed, satellites has english
  if (locale !== 'en' || !Flags.HAS_NEWSROOM) {
    return {
      notFound: true,
    }
  }
  const { perspective } = previewData as { perspective: ClientPerspective }

  const previewContext = {
    preview,
    perspective,
  }
  const lang = getNameFromLocale(locale)
  const intl = await getIntl(locale, previewContext)

  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const indexName = `${envPrefix}_NEWS_en-GB`

  const searchClient = algoliasearch(algolia.applicationId, algolia.searchApiKey)
  const index = searchClient.initIndex(indexName)
  const response = await index.search('', {
    hitsPerPage: 50,
    facetFilters: ['type:news', 'topicTags:-Crude Oil Assays'],
    facetingAfterDistinct: true,
    facets: ['countryTags', 'topicTags', 'year'],
  })

  const queryParams = {
    lang,
  }

  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query: newsroomQuery,
      queryParams,
    },
    previewContext,
  )

  const serverState = await getServerState(<NewsRoom data={{ menuData, pageData, footerData, intl, response }} />, {
    renderToString,
  })
  return {
    props: {
      data: {
        menuData,
        footerData,
        intl,
        pageData,
        response,
      },
      serverState,
    },
  }
}
