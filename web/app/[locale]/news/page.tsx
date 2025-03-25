import { getIsoFromLocale, getNameFromLocale } from '../../../lib/localization'
import { Flags } from '../../../common/helpers/datasetHelpers'
import getIntl from '../../../common/helpers/getIntl'
import algoliasearch from 'algoliasearch'
import { algolia } from '../../../lib/config'
import { getComponentsData } from '../../../lib/fetchData'
import { newsroomQuery } from '../../../lib/queries/newsroom'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { Layout } from '@sections/Layout/Layout'
import { defaultLanguage } from '../../../languages'
import NewsRoomTemplate from '@templates/newsroom/Newsroom'
import { NewsRoomPageType } from '../../../types'
import { IntlShape } from '@formatjs/intl'
import { SearchResponse } from '@algolia/client-search'
import ServerIntlProvider from '../../ServerIntlProvider'
import Header from '@sections/Header/Header'

type NewsRoomPageProps = {
  locale: string
  intl: IntlShape
  pageData: NewsRoomPageType
  response: SearchResponse
}

const getInitialResponse = unstable_cache(
  async () => {
    console.log('Querying algolia')
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
    return response
  },
  ['news'],
  { revalidate: 3600, tags: ['news'] },
)

export default async function NewsPage({ params, preview = false }: any) {
  const { locale } = await params
  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not English.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485
  // Only build when newsroom allowed, satellites has english
  if (locale !== 'en' || !Flags.HAS_NEWSROOM) {
    notFound()
  }

  const lang = getNameFromLocale(locale)
  const intl = await getIntl(locale, false)

  const queryParams = {
    lang,
  }

  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query: newsroomQuery,
      queryParams,
    },
    preview,
  )

  const { slug } = pageData
  const response = await getInitialResponse()
  const slugs = [
    { slug: '/news', lang: 'en_GB' },
    { slug: '/nyheter', lang: 'nb_NO' },
  ]
  return (
    <ServerIntlProvider locale={getIsoFromLocale(locale)} messages={intl?.messages}>
      <Layout footerData={footerData} hasSticky={false}>
        <>
          <Header slugs={slugs} menuData={menuData} />
          <NewsRoomTemplate
            locale={locale}
            pageData={pageData as NewsRoomPageType}
            initialSearchResponse={response}
            //slug={slug}
          />
        </>
      </Layout>
    </ServerIntlProvider>
  )
}
