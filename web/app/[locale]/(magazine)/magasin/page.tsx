import { getIsoFromLocale, getNameFromLocale } from '../../../../lib/localization'
import { Flags } from '../../../../common/helpers/datasetHelpers'
import { algolia } from '../../../../lib/config'
import { getPageData } from '../../../../sanity/lib/fetchData'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import MagazineRoom from '@/templates/magazine/Magazineroom'
import { MagazineIndexPageType } from '../../../../types'
import { setRequestLocale } from 'next-intl/server'
import { allMagazineDocuments, magazineQuery } from '@/sanity/queries/magazine'
import { algoliasearch } from 'algoliasearch'
import { toPlainText } from 'next-sanity'
import { isDateAfter } from '@/common/helpers/dateUtilities'
import getOpenGraphImages from '@/common/helpers/getOpenGraphImages'
import { metaTitleSuffix } from '@/languages'
import { Metadata, ResolvingMetadata } from 'next'

export function generateStaticParams() {
  return Flags.HAS_MAGAZINE ? [{ locale: 'no' }] : []
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
    query: allMagazineDocuments,
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
      url: 'https://www.equinor.com/no/magasin',
      locale,
      type: 'article',
      siteName: 'Equinor',
      publishedTime: publishDateTime,
      modifiedTime: modifiedDate,
      images: openGraphImages,
    },
    alternates: {
      canonical: 'https://www.equinor.com/no/magasin',
      languages: {
        en: 'https://www.equinor.com/magazine',
        'x-default': 'https://www.equinor.com/magazine',
      },
    },
  }
}

const getInitialResponse = unstable_cache(
  async (locale: string) => {
    const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
    const indexName = `${envPrefix}_MAGAZINES_${locale}`

    const searchClient = algoliasearch(algolia.applicationId, algolia.searchApiKey)
    const response = await searchClient.searchSingleIndex({
      indexName: indexName,
      searchParams: {
        hitsPerPage: 50,
        facetFilters: ['type:magazine', 'topicTags:-Crude Oil Assays'],
        facetingAfterDistinct: true,
        facets: ['countryTags', 'topicTags', 'year'],
      },
    })
    return response
  },
  ['magazine'],
  { revalidate: 3600, tags: ['magazine'] },
)

export default async function MagazinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!Flags.HAS_MAGAZINE || locale !== 'no') {
    notFound()
  }

  setRequestLocale(locale)

  const lang = getNameFromLocale(locale)
  const isoLocale = getIsoFromLocale(locale)

  const queryParams = {
    lang,
  }

  const { pageData } = await getPageData({
    query: magazineQuery,
    queryParams,
  })

  const response = await getInitialResponse(isoLocale)

  return <MagazineRoom pageData={pageData as MagazineIndexPageType} />
}
