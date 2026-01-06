import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import type { QueryParams } from 'next-sanity'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import {
  getNameFromIso,
  getNameFromLocale,
} from '@/sanity/helpers/localization'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { PageWrapper } from '@/sanity/pages/PageWrapper'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import {
  allMagazineDocuments,
  getMagazineArticlesByTag,
} from '@/sanity/queries/magazine'
import { magazineroomMetaQuery } from '@/sanity/queries/metaData'
import { magazineSlug } from '@/sitesConfig'
import MagazineRoom from '@/templates/magazine/Magazineroom'

export function generateStaticParams() {
  return Flags.HAS_MAGAZINE ? [{ locale: 'nb-NO' }] : []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const pageSlug = slug ?? magazineSlug[getNameFromIso(locale)]
  const metaData = await sanityFetch({
    query: magazineroomMetaQuery,
    params: {
      lang: getNameFromLocale(locale),
      slug: `/${pageSlug}`,
      tags: ['magazineIndexPage'],
    },
    stega: false,
  })

  return constructSanityMetadata(pageSlug, locale, metaData)
}

export default async function MagazineRoomPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; locale: string }>
  searchParams?: Promise<{ tag?: string }>
}) {
  const { locale, slug } = await params
  const tag = (await searchParams)?.tag
  const pageSlug = slug ?? magazineSlug[getNameFromIso(locale)]
  if (!Flags.HAS_MAGAZINE_INDEX) {
    notFound()
  }
  setRequestLocale(locale)

  const { headerData, pageData: magazineroomData } = await getPage({
    slug: pageSlug,
    locale,
    tags: ['magazineIndexPage'],
  })

  const articles = await sanityFetch({
    query:
      tag && tag !== 'all'
        ? getMagazineArticlesByTag(false, false)
        : allMagazineDocuments,
    params: {
      lang: getNameFromIso(locale),
      ...(tag && tag !== 'all' && { tag }),
    } as QueryParams,
    tags: ['magazine'],
  })

  const pageData = {
    ...magazineroomData,
    magazineArticles: articles ?? [],
  }

  return (
    <PageWrapper headerData={headerData}>
      <MagazineRoom {...pageData} />
    </PageWrapper>
  )
}
