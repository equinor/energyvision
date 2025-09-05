import { getIsoFromLocale, getNameFromLocale } from '../../../../lib/localization'
import { Flags } from '../../../../common/helpers/datasetHelpers'
import { algolia } from '../../../../lib/config'
import { getPageData } from '../../../../sanity/lib/fetchData'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import NewsRoomTemplate from '@/templates/newsroom/Newsroom'
import { NewsRoomPageType } from '../../../../types'
import { setRequestLocale } from 'next-intl/server'
import { newsroomQuery } from '@/sanity/queries/newsroom'
import { algoliasearch } from 'algoliasearch'
import { toPlainText } from 'next-sanity'
import { isDateAfter } from '@/common/helpers/dateUtilities'
import getOpenGraphImages from '@/common/helpers/getOpenGraphImages'
import { metaTitleSuffix } from '@/languages'
import { Metadata, ResolvingMetadata } from 'next'

export function generateStaticParams() {
  return Flags.HAS_NEWSROOM ? [{ locale: 'en' }] : []
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params
  const lang = getNameFromLocale(locale)

  const queryParams = {
    lang,
  }
  const { pageData } = await getPageData({
    query: newsroomQuery,
    queryParams,
  })

  const { publishDateTime, updatedAt, documentTitle, title, metaDescription, openGraphImage, heroImage } = pageData
  const plainTitle = Array.isArray(title) ? toPlainText(title) : title

  const modifiedDate = isDateAfter(publishDateTime, updatedAt) ? publishDateTime : updatedAt
  const openGraphImages = getOpenGraphImages((openGraphImage?.asset ? openGraphImage : null) || heroImage?.image)

  return {
    title: `${documentTitle || plainTitle} - ${metaTitleSuffix}`,
    description: metaDescription,
    openGraph: {
      title: plainTitle,
      description: metaDescription,
      url: 'https://www.equinor.com/news',
      locale,
      type: 'article',
      siteName: 'Equinor',
      publishedTime: publishDateTime,
      modifiedTime: modifiedDate,
      images: openGraphImages,
    },
    alternates: {
      canonical: 'https://www.equinor.com/news',
      languages: {
        no: 'https://www.equinor.com/no/nyheter',
        'x-default': 'https://www.equinor.com/news',
      },
    },
  }
}

const getInitialResponse = unstable_cache(
  async (locale: string) => {
    const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
    const indexName = `${envPrefix}_NEWS_${locale}`

    const searchClient = algoliasearch(algolia.applicationId, algolia.searchApiKey)
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

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not English.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485
  // Only build when newsroom allowed, satellites has english

  if (!Flags.HAS_NEWSROOM && locale !== 'en') {
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

  const response = await getInitialResponse(isoLocale)

  return <NewsRoomTemplate locale={locale} pageData={pageData as NewsRoomPageType} initialSearchResponse={response} />
}
