import { algoliasearch } from 'algoliasearch'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { toPlainText } from 'next-sanity'
import { metaTitleSuffix } from '@/languageConfig'
import { algolia } from '@/lib/config'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { sanityFetch } from '@/sanity/lib/live'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { getIsoFromLocale, getNameFromLocale } from '@/sanity/localization'
import { menuQuery } from '@/sanity/queries/menu'
import { newsroomQuery } from '@/sanity/queries/newsroom'
import Header from '@/sections/Header/Header'
import NewsRoomTemplate from '@/templates/newsroom/Newsroom'
import { newsroomSlugs } from '../news/page'

export function generateStaticParams() {
  return Flags.HAS_NEWSROOM ? [{ locale: 'no' }] : []
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
  const lang = getNameFromLocale(locale)

  const queryParams = {
    lang,
  }
  const { data: pageData } = await sanityFetch({
    query: newsroomQuery,
    params: queryParams,
  })

  const { documentTitle, title, metaDescription, openGraphImage, heroImage } =
    pageData
  const plainTitle = Array.isArray(title) ? toPlainText(title) : title

  const ogImage = resolveOpenGraphImage(openGraphImage ?? heroImage?.image)

  return {
    title: `${documentTitle || plainTitle} - ${metaTitleSuffix}`,
    description: metaDescription,
    openGraph: {
      title: plainTitle,
      description: metaDescription,
      url: 'https://www.equinor.com/no/nyheter',
      locale,
      type: 'website',
      siteName: 'Equinor',
      images: ogImage,
    },
    alternates: {
      canonical: 'https://www.equinor.com/no/nyheter',
      languages: {
        en: 'https://www.equinor.com/news',
        'x-default': 'https://www.equinor.com/news',
      },
    },
  }
}

export default async function NewsroomPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

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

  const lang = getNameFromLocale(locale)
  const isoLocale = getIsoFromLocale(locale)

  const queryParams = {
    lang,
  }
  const [{ data: headerData }, { data: newsroomData }] = await Promise.all([
    sanityFetch({
      query: menuQuery,
      params: { ...queryParams, slug: '/news' },
    }),
    sanityFetch({ query: newsroomQuery, params: queryParams }),
  ])

  const response = await getInitialResponse(isoLocale)

  return (
    <>
      <Header slugs={newsroomSlugs} menuData={headerData} />
      <NewsRoomTemplate
        locale={locale}
        pageData={newsroomData}
        initialSearchResponse={response}
      />
    </>
  )
}
