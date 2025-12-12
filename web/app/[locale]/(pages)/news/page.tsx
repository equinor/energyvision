import { algoliasearch } from 'algoliasearch'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { algolia } from '@/lib/config'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { getNameFromIso } from '@/sanity/localization'
import { newsroomMetaQuery } from '@/sanity/metaData'
import Footer from '@/sections/Footer/Footer'
import Header from '@/sections/Header/Header'
import NewsRoomTemplate from '@/templates/newsroom/Newsroom'
import { constructSanityMetadata, getPage } from '../[...slug]/page'

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

  const metaData = await sanityFetch({
    query: newsroomMetaQuery,
    params: {
      lang: getNameFromIso(locale),
    },
    stega: false,
  })

  console.log('NO newsroom metadata', metaData)

  return constructSanityMetadata(
    metaData?.slugs?.currentSlug?.slug,
    locale,
    metaData,
  )
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
  { tags: ['news'] },
)

export default async function NewsroomPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { locale, slug } = await params
  console.log('NewsroomPage locale', locale)
  console.log('NewsroomPage slug', slug)

  if (!Flags.HAS_NEWSROOM) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  const { headerData, pageData, footerData } = await getPage({ slug, locale })

  const response = await getInitialResponse(locale)

  return (
    <>
      <Header {...headerData} />
      <NewsRoomTemplate
        locale={locale}
        pageData={pageData}
        initialSearchResponse={response}
      />
      <Footer {...footerData} />
    </>
  )
}
