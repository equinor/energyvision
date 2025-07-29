import { getIsoFromLocale, getNameFromLocale } from '../../../lib/localization'
import { Flags } from '../../../common/helpers/datasetHelpers'
import { algolia } from '../../../lib/config'
import { getPageData } from '../../../sanity/lib/fetchData'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import NewsRoomTemplate from '@/templates/newsroom/Newsroom'
import { NewsRoomPageType } from '../../../types'
//import { IntlShape } from '@formatjs/intl'
import { SearchResponse } from '@algolia/client-search'
//import ServerIntlProvider from '../../ServerIntlProvider'
import { setRequestLocale } from 'next-intl/server'
import { newsroomQuery } from '@/sanity/queries/newsroom'
import { algoliasearch } from 'algoliasearch'

type NewsRoomPageProps = {
  locale: string
  // intl: IntlShape
  pageData: NewsRoomPageType
  response: SearchResponse
}

const getInitialResponse = unstable_cache(
  async (locale: string) => {
    console.log('Querying algolia')
    const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
    const indexName = `${envPrefix}_NEWS_${locale}`

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

export default async function NewsPage({ params }: any) {
  const { locale } = await params

  console.log('LOCALE > NEWS > PAGE > params', params)

  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not English.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485
  // Only build when newsroom allowed, satellites has english

  if (!Flags.HAS_NEWSROOM) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  const lang = getNameFromLocale(locale)
  const isoLocale = getIsoFromLocale(locale)

  const queryParams = {
    lang,
  }

  const { pageData } = await getPageData({
    query: newsroomQuery,
    queryParams,
  })
  console.log('pagedata for news>page', pageData)

  const response = await getInitialResponse(isoLocale)

  return <NewsRoomTemplate locale={locale} pageData={pageData as NewsRoomPageType} initialSearchResponse={response} />
}
