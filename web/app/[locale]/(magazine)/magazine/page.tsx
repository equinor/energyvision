import { getNameFromLocale } from '../../../../lib/localization'
import { Flags } from '../../../../common/helpers/datasetHelpers'
import { getPageData } from '../../../../sanity/lib/fetchData'
import { notFound } from 'next/navigation'
import MagazineRoom from '@/templates/magazine/Magazineroom'
import { MagazineIndexPageType } from '../../../../types'
import { setRequestLocale } from 'next-intl/server'
import { allMagazineDocuments } from '@/sanity/queries/magazine'
import { toPlainText } from 'next-sanity'
import { isDateAfter } from '@/common/helpers/dateUtilities'
import getOpenGraphImages from '@/common/helpers/getOpenGraphImages'
import { metaTitleSuffix } from '@/languages'
import { Metadata, ResolvingMetadata } from 'next'

export function generateStaticParams() {
  return Flags.HAS_MAGAZINE ? [{ locale: 'en' }] : []
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
      url: 'https://www.equinor.com/magazine',
      locale,
      type: 'article',
      siteName: 'Equinor',
      publishedTime: publishDateTime,
      modifiedTime: modifiedDate,
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

export default async function MagazinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!Flags.HAS_MAGAZINE_INDEX || locale !== 'en') {
    notFound()
  }

  setRequestLocale(locale)

  const lang = getNameFromLocale(locale)

  const queryParams = {
    lang,
  }

  // Use magazine index query, not magazineQuery (which expects slug)
  const { pageData } = await getPageData({
    query: allMagazineDocuments,
    queryParams,
  })

  return <MagazineRoom pageData={pageData as MagazineIndexPageType} />
}
