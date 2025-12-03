import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { QueryParams } from 'next-sanity'
import { metaTitleSuffix } from '@/languageConfig'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { sanityFetch } from '@/sanity/lib/live'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { getNameFromLocale } from '@/sanity/localization'
import {
  allMagazineDocuments,
  getMagazineArticlesByTag,
  magazineIndexQuery,
} from '@/sanity/queries/magazine'
import MagazineRoom from '@/templates/magazine/Magazineroom'

/* export function generateStaticParams() {
  return Flags.HAS_MAGAZINE ? [{ locale: 'no' }] : []
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
  const { data: pageData } = await sanityFetch({
    query: magazineIndexQuery,
    params: queryParams,
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
  const tag = (await searchParams)?.tag

  if (!Flags.HAS_MAGAZINE) {
    notFound()
  }
  /*   setRequestLocale(locale) */

  const lang = getNameFromLocale(locale)

  const queryParams = {
    lang,
  }
  const articlesQuery =
    tag && tag !== 'all'
      ? getMagazineArticlesByTag(false, false)
      : allMagazineDocuments
  const articlesParams =
    tag && tag !== 'all' ? { ...queryParams, tag } : queryParams

  const [{ data: magazineroomData }, { data: articles }] = await Promise.all([
    sanityFetch({ query: magazineIndexQuery, params: queryParams }),
    sanityFetch({
      query: articlesQuery,
      params: articlesParams as QueryParams,
    }),
  ])

  const magazineroom = Array.isArray(magazineroomData)
    ? magazineroomData[0]
    : magazineroomData

  const pageData = {
    ...magazineroom,
    magazineArticles: articles ?? [],
  }

  return <MagazineRoom {...pageData} />
}
