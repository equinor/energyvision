/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { metaTitleSuffix } from '@/languageConfig'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getData, getPageData } from '@/sanity/lib/fetchData'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { getNameFromLocale } from '@/sanity/localization'
import {
  allMagazineDocuments,
  getMagazineArticlesByTag,
  magazineIndexQuery,
} from '@/sanity/queries/magazine'
import MagazineRoom from '@/templates/magazine/Magazineroom'
import type { MagazineIndexPageType } from '@/types'

export function generateStaticParams() {
  return Flags.HAS_MAGAZINE ? [{ locale: 'no' }] : []
}

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
  const index = Array.isArray(pageData) ? pageData[0] : pageData
  const documentTitle = index?.seoAndSome?.documentTitle
  const metaDescription = index?.seoAndSome?.metaDescription
  const title = index?.title
  const heroImage = index?.hero?.figure?.image
  const ogImage = resolveOpenGraphImage(
    index?.seoAndSome?.openGraphImage ?? heroImage,
  )

  return {
    title: `${documentTitle || title || 'Magasin'} - ${metaTitleSuffix}`,
    description: metaDescription,
    openGraph: {
      title: title || 'Magasin',
      description: metaDescription,
      url: 'https://www.equinor.com/no/magasin',
      locale,
      type: 'website',
      siteName: 'Equinor',
      images: ogImage,
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

export default async function MagazinePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ tag?: string }>
}) {
  const { locale } = await params

  if (!Flags.HAS_MAGAZINE || locale !== 'no') {
    notFound()
  }

  setRequestLocale(locale)

  const lang = getNameFromLocale(locale)

  const queryParams = {
    lang,
  }
  // Fetch index (hero, tags, footer)
  const { pageData: indexPageData } = await getPageData({
    query: magazineIndexQuery,
    queryParams,
  })
  const index = Array.isArray(indexPageData) ? indexPageData[0] : indexPageData

  // Fetch list of articles (by tag or all)
  const tag = (await searchParams)?.tag
  let magazineArticles = []
  if (tag && tag !== 'all') {
    const { data } = await getData({
      query: getMagazineArticlesByTag(false, false),
      queryParams: { ...(queryParams as any), tag } as any,
    })
    //@ts-ignore:todo types
    magazineArticles = data
  } else {
    const { data } = await getData({
      query: allMagazineDocuments,
      queryParams: queryParams as any,
    })
    //@ts-ignore:todo types
    magazineArticles = data
  }

  // Compose pageData even if index is missing so the list still renders
  const pageData: MagazineIndexPageType = index
    ? ({ ...(index as any), magazineArticles } as any)
    : ({ magazineArticles } as any)

  return <MagazineRoom pageData={pageData} />
}
