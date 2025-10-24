import { getQueryFromSlug } from '../../../../lib/queryFromSlug'
import { notFound } from 'next/navigation'
import HomePage from '../../../../templates/homepage/HomePage'
import { defaultLanguage, domain, languages, metaTitleSuffix } from '@/languages'
import { getPageData } from '@/sanity/lib/fetchData'
import { Metadata } from 'next'
import getOpenGraphImages from '@/common/helpers/getOpenGraphImages'
import { toPlainText } from 'next-sanity'

export const dynamicParams = true // fallback to true in app router

type Params = Promise<{ locale: string }>
export async function generateMetadata(params: Params): Promise<Metadata> {
  const defaultLocale = defaultLanguage.locale
  const locale = (await params).locale ?? defaultLocale
  const fullSlug = `${domain}/${locale !== defaultLocale ? `${locale}/` : ''}`

  const { query, queryParams } = await getQueryFromSlug(undefined, locale)

  const { pageData: fullData } = await getPageData({
    query,
    queryParams,
  })
  //@ts-ignore: todo
  const { documentTitle, title, metaDescription, openGraphImage, heroImage } = fullData.pageData
  const plainTitle = Array.isArray(title) ? toPlainText(title) : title

  const openGraphImages = getOpenGraphImages((openGraphImage?.asset ? openGraphImage : null) || heroImage?.image)

  const alternateLinks: Record<string, string> = {}
  languages.forEach(({ locale }) => {
    Object.assign(alternateLinks, { [locale]: `${domain}${defaultLocale !== locale ? `/${locale}` : ''}` })
  })
  return {
    title: `${documentTitle || plainTitle} - ${metaTitleSuffix}`,
    description: metaDescription,
    openGraph: {
      title: plainTitle,
      description: metaDescription,
      url: fullSlug,
      locale,
      type: 'article',
      siteName: 'Equinor',
      images: openGraphImages,
    },
    alternates: {
      languages: {
        'en-GB': `${domain}/`,
        ...alternateLinks,
        'x-default': `${domain}/`,
      },
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const { locale } = await params
  if (!languages.map((it) => it.locale).includes(locale)) notFound()

  const { query, queryParams } = await getQueryFromSlug(params?.slug as string[], locale)

  const { pageData: fullData } = await getPageData({
    query,
    queryParams,
  })
  const { pageData: data, slugs: s } = fullData
  const pageData = { ...data, s }
  if (!pageData) notFound()

  const slug = pageData?.slug

  const template = pageData?.template || null

  if (!template) console.warn('Missing template for', slug)

  return <HomePage data={pageData} />
}
