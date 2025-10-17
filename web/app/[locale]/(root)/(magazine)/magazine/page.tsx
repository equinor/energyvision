/* eslint-disable @typescript-eslint/no-explicit-any */
//TODO types
import { getNameFromLocale } from '../../../../../lib/localization'
import { Flags } from '../../../../../common/helpers/datasetHelpers'
import { getPageData, getData } from '../../../../../sanity/lib/fetchData'
import { notFound } from 'next/navigation'
import MagazineRoom from '@/templates/magazine/Magazineroom'
import { MagazineIndexPageType } from '../../../../../types'
import { setRequestLocale } from 'next-intl/server'
import { allMagazineDocuments, magazineIndexQuery, getMagazineArticlesByTag } from '@/sanity/queries/magazine'
import getOpenGraphImages from '@/common/helpers/getOpenGraphImages'
import { metaTitleSuffix } from '@/languages'
import { Metadata } from 'next'

export function generateStaticParams() {
  return Flags.HAS_MAGAZINE ? [{ locale: 'en' }] : []
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const lang = getNameFromLocale(locale)

  const queryParams = {
    lang,
  }
  const { pageData } = await getPageData({
    query: magazineIndexQuery,
    queryParams,
  })
  const index = Array.isArray(pageData) ? pageData[0] : pageData
  const documentTitle = index?.seoAndSome?.documentTitle
  const metaDescription = index?.seoAndSome?.metaDescription
  const title = index?.title
  const heroImage = index?.hero?.figure?.image
  const ogImage = index?.seoAndSome?.openGraphImage
  const openGraphImages = getOpenGraphImages((ogImage?.asset ? ogImage : null) || heroImage)

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
      images: openGraphImages,
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

  if (!Flags.HAS_MAGAZINE_INDEX || locale !== 'en') {
    notFound()
  }

  setRequestLocale(locale)

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
  let magazineArticles: any[] = []
  if (tag && tag !== 'all') {
    const { data } = await getData({
      query: getMagazineArticlesByTag(false, false),
      queryParams: { ...(queryParams as any), tag } as any,
    })
    magazineArticles = data
  } else {
    const { data } = await getData({ query: allMagazineDocuments, queryParams: queryParams as any })
    magazineArticles = data
  }

  const pageData: MagazineIndexPageType = { ...(index as any), magazineArticles } as any

  return <MagazineRoom pageData={pageData} />
}
