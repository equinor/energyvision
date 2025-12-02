/* eslint-disable @typescript-eslint/no-explicit-any */
//TODO types
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type ContentSourceMap, toPlainText } from 'next-sanity'
import { metaTitleSuffix } from '@/languageConfig'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import {
  allMagazineDocuments,
  getMagazineArticlesByTag,
  magazineIndexQuery,
} from '@/sanity/queries/magazine'
import MagazineRoom from '@/templates/magazine/Magazineroom'
import { getData, getPageData } from '../../../../../sanity/lib/fetchData'
import { getNameFromLocale } from '../../../../../sanity/localization'

/* export function generateStaticParams() {
  return Flags.HAS_MAGAZINE ? [{ locale: 'en' }] : []
} */

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
  const { pageData } = await getPageData({
    query: magazineIndexQuery,
    queryParams,
  })
  console.log('pageData', pageData)
  const index = Array.isArray(pageData) ? pageData[0] : pageData
  const documentTitle = index?.seoAndSome?.documentTitle
  const metaDescription = index?.seoAndSome?.metaDescription
  const title = toPlainText(index?.title)
  console.log('metadata documentTitle', documentTitle)
  console.log('metadata title', title)
  const heroImage = index?.hero?.figure?.image
  const ogImage = resolveOpenGraphImage(
    index?.seoAndSome?.openGraphImage ?? heroImage,
  )

  return {
    title: `${documentTitle || title || 'Magazine'} - ${metaTitleSuffix}`,
    description: metaDescription,
    openGraph: {
      title: title || 'Magazine',
      description: metaDescription,
      url: 'https://www.equinor.com/magazine',
      locale,
      type: 'website',
      siteName: 'Equinor',
      images: ogImage,
    },
    alternates: {
      canonical: 'https://www.equinor.com/magazine',
      languages: {
        no: 'https://www.equinor.com/no/magasin',
        'x-default': 'https://www.equinor.com/magazine',
      },
    },
  }
}

export default async function MagazinePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ tag?: string }>
}) {
  const { locale } = await params
  console.log('MagazinePage locale', locale)

  if (!Flags.HAS_MAGAZINE_INDEX) {
    notFound()
  }

  /*   setRequestLocale(locale) */
  //Can assume english lang, dont actually need to get locale? Since english route
  const lang = getNameFromLocale(locale)

  const queryParams = {
    lang,
  }
  console.log('[MagazinePage][en] Locale:', locale, 'Lang param:', lang)
  // Fetch index (hero, tags, footer)

  const { pageData: indexPageData } = await getPageData({
    query: magazineIndexQuery,
    queryParams,
  })
  const index = Array.isArray(indexPageData) ? indexPageData[0] : indexPageData

  // Fetch list of articles (by tag or all)
  const tag = (await searchParams)?.tag
  let magazineArticles:
    | {
        data: any
        sourceMap: ContentSourceMap | null
        tags: string[]
      }
    | never[]
  if (tag && tag !== 'all') {
    const { data } = await getData({
      query: getMagazineArticlesByTag(false, false),
      queryParams: { ...(queryParams as any), tag } as any,
    })
    magazineArticles = data
  } else {
    const { data } = await getData({
      query: allMagazineDocuments,
      queryParams: queryParams as any,
    })
    magazineArticles = data
  }

  const pageData = {
    ...(index as any),
    magazineArticles: magazineArticles?.data ?? [],
  } as any

  return <MagazineRoom pageData={pageData} />
}
