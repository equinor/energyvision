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

export function generateStaticParams() {
  return Flags.HAS_NEWSROOM ? [{ locale: 'nb-NO' }] : []
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
  ['newsroom'],
)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (Flags.HAS_NEWSROOM) {
    const { data: metaData }: { data: any } = await routeSanityFetch({
      query: newsroomMetaQuery,
      params: {
        lang: getNameFromIso(locale),
      },
      stega: false,
      requestTag: 'meta-nyheter',
    })

    return constructSanityMetadata(
      newsSlug[getNameFromIso(locale)],
      locale,
      metaData,
    )
  }

  return constructSanityMetadata(newsSlug[getNameFromIso(locale)], locale)
}
export default async function NewsroomPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  // Enable static rendering
  setRequestLocale(locale)

  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not Norwegian.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485
  // Only build when newsroom allowed, satellites has norwegian

  if (!Flags.HAS_NEWSROOM || locale !== 'nb-NO') {
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
