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
    const metaData = await sanityFetch({
      query: newsroomMetaQuery,
      params: {
        lang: getNameFromIso(locale),
      },
      stega: false,
    })

    console.log('english newsroom metadata', metaData)

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
  }
)

export default async function NewsroomPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { locale, slug } = await params

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
