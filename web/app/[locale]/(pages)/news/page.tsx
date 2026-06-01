import { newsSlug } from '@energyvision/shared/satelliteConfig'
import { algoliasearch } from 'algoliasearch'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { algolia } from '@/lib/config'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getNameFromIso } from '@/sanity/helpers/localization'
import { routeSanityFetch } from '@/sanity/lib/live'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { newsroomMetaQuery } from '@/sanity/queries/metaData'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import Header from '@/sections/Header/Header'
import NewsRoomTemplate from '@/templates/newsroom/Newsroom'

export async function generateStaticParams() {
  if (Flags.HAS_NEWSROOM) {
    return [{ locale: 'en-GB' }]
  }
  return []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const pageSlug = newsSlug[getNameFromIso(locale)]
  if (Flags.HAS_NEWSROOM) {
    const { data: metaData } = await routeSanityFetch({
      query: newsroomMetaQuery,
      params: {
        lang: getNameFromIso(locale),
      },
      stega: false,
      requestTag: 'meta-news',
    })

    return constructSanityMetadata(pageSlug, locale, metaData)
  }

  return constructSanityMetadata(pageSlug, locale, undefined)
}

const getInitialResponse = unstable_cache(
  // this gets revalidated by path
  async (locale: string) => {
    const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
    const indexName = `${envPrefix}_NEWS_${locale}`

    const searchClient = algoliasearch(
      algolia.applicationId,
      algolia.searchApiKey,
    )
    const response = await searchClient.searchSingleIndex({
      indexName: indexName,
      searchParams: {
        hitsPerPage: 50,
        facetFilters: ['type:news', 'topicTags:-Crude Oil Assays'],
        facetingAfterDistinct: true,
        facets: ['countryTags', 'topicTags', 'year'],
      },
    })
    return response
  },
)

export default async function NewsroomPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { locale, slug } = await params
  // Enable static rendering
  setRequestLocale(locale)

  if (!Flags.HAS_NEWSROOM || locale !== 'en-GB') {
    notFound()
  }

  const [siteMenuResult, pageResults] = await Promise.all([
    routeSanityFetch({
      query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
      params: {
        lang: getNameFromIso(locale) ?? 'en_GB',
      },
    }),
    getPage({
      slug: slug ?? newsSlug[getNameFromIso(locale)],
      locale,
      tags: ['newsroom'],
    }),
  ])

  const { headerData, pageData } = pageResults
  const { data: siteMenuData } = siteMenuResult || {}

  const response = await getInitialResponse(locale)

  return (
    <>
      <Header siteMenuData={siteMenuData} headerData={headerData} />
      <NewsRoomTemplate
        locale={locale}
        pageData={pageData}
        initialSearchResponse={response}
      />
    </>
  )
}
