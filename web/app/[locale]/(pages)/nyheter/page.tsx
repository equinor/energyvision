import { algoliasearch } from 'algoliasearch'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { algolia } from '@/lib/config'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import {
  getLocaleFromName,
  getNameFromIso,
  getNameFromLocale,
} from '@/sanity/localization'
import { newsroomMetaQuery } from '@/sanity/metaData'
import { menuQuery } from '@/sanity/queries/menu'
import { newsroomQuery } from '@/sanity/queries/newsroom'
import Footer from '@/sections/Footer/Footer'
import Header from '@/sections/Header/Header'
import NewsRoomTemplate from '@/templates/newsroom/Newsroom'
import { constructSanityMetadata, getPage } from '../[...slug]/page'

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

  const metaData = await sanityFetch({
    query: newsroomMetaQuery,
    params: {
      lang: getNameFromIso(locale),
    },
    stega: false,
  })
  const localizedCurrentSlug =
    `/${getLocaleFromName(metaData?.slugs?.currentSlug?.lang)}` +
    metaData?.slugs?.currentSlug?.slug
  console.log(
    'NO Newsroom Generate meta localizedCurrentSlug',
    localizedCurrentSlug,
  )
  return constructSanityMetadata(localizedCurrentSlug, locale, metaData)
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
