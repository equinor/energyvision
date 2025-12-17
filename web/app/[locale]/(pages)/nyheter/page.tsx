import { algoliasearch } from 'algoliasearch'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { algolia } from '@/lib/config'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getNameFromIso } from '@/sanity/helpers/localization'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { PageWrapper } from '@/sanity/pages/PageWrapper'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import { newsroomMetaQuery } from '@/sanity/queries/metaData'
import { newsSlug } from '@/sitesConfig'
import NewsRoomTemplate from '@/templates/newsroom/Newsroom'

export function generateStaticParams() {
  return Flags.HAS_NEWSROOM ? [{ locale: 'nb-NO' }] : []
}

const getInitialResponse = unstable_cache(
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
  ['news'],
  { revalidate: 3600, tags: ['news'] },
)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (Flags.HAS_NEWSROOM) {
    const metaData = await sanityFetch({
      query: newsroomMetaQuery,
      params: {
        lang: getNameFromIso(locale),
      },
      stega: false,
    })

    console.log('norwegian newsroom metadata', metaData)

    return constructSanityMetadata(
      newsSlug[getNameFromIso(locale)],
      locale,
      metaData,
    )
  }

  return constructSanityMetadata(
    newsSlug[getNameFromIso(locale)],
    locale,
    undefined,
  )
}
export default async function NewsroomPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not Norwegian.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485
  // Only build when newsroom allowed, satellites has norwegian

  if (!Flags.HAS_NEWSROOM) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  const { headerData, pageData } = await getPage({
    slug: slug ?? newsSlug[getNameFromIso(locale)],
    locale,
    tags: ['newsroom'],
  })

  const response = await getInitialResponse(locale)

  return (
    <PageWrapper headerData={headerData}>
      <NewsRoomTemplate
        locale={locale}
        pageData={pageData}
        initialSearchResponse={response}
      />
    </PageWrapper>
  )
}
