import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'
import {
  defaultLanguage,
  domain,
  languages,
  metaTitleSuffix,
} from '@/languageConfig'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import getPageSlugs from '@/sanity/helpers/getPageSlugs'
import { getQueryFromSlug } from '@/sanity/helpers/queryFromSlug'
import { getPageData } from '@/sanity/lib/fetchData'
import { sanityFetch } from '@/sanity/lib/live'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { getNameFromLocale } from '@/sanity/localization'
import { homePageQuery } from '@/sanity/queries/homePage'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import Header from '@/sections/Header/Header'
import HomePage from '@/templates/homepage/HomePage'

export const dynamicParams = true // fallback to true in app router

type Params = Promise<{ locale: string; slug: string }>

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const defaultLocale = defaultLanguage.locale
  const locale = (await params).locale ?? defaultLocale
  const fullSlug = `${domain}/${locale !== defaultLocale ? `${locale}/` : ''}`

  console.log('generateMetadata (default) page, locale', locale)
  const { query, queryParams } = await getQueryFromSlug(undefined, locale)

  const { pageData: fullData } = await getPageData({
    query,
    queryParams,
  })
  //@ts-ignore: todo
  const { documentTitle, title, metaDescription, openGraphImage, heroImage } =
    fullData.pageData
  const plainTitle = Array.isArray(title) ? toPlainText(title) : title
  console.log('openGraphImage', openGraphImage)

  const ogImage = resolveOpenGraphImage(openGraphImage ?? heroImage?.image)
  console.log('ogImage', ogImage)

  const alternateLinks: Record<string, string> = {}
  languages.forEach(({ locale }) => {
    Object.assign(alternateLinks, {
      [locale]: `${domain}${defaultLocale !== locale ? `/${locale}` : ''}`,
    })
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
      images: ogImage,
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

export default async function IndexPage({ params }: any) {
  const { locale, slug } = await params
  if (!languages.map(it => it.locale).includes(locale)) notFound()
  const menuQuery = Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery
  const queryParams = {
    lang: getNameFromLocale(locale),
  }
  console.log('IndexPage(homepage) slug', slug)
  /*  const { query, queryParams } = await getQueryFromSlug(slug, locale) */
  const date = new Date().toISOString().substring(0, 10)

  const [{ data: headerData }, { data: fullData }] = await Promise.all([
    sanityFetch({
      query: menuQuery,
      params: { ...queryParams },
    }),
    sanityFetch({
      query: homePageQuery,
      params: { ...queryParams, date },
      tags: ['homePage'],
    }),
  ])

  console.log('IndexPage(homepage) fullData', fullData)
  const { pageData } = fullData

  if (!pageData) notFound()

  const pageSlug = pageData?.slug
  const slugs = getPageSlugs(pageData)

  const template = pageData?.template || null

  if (!template) console.warn('Missing template for', pageSlug)

  return (
    <>
      <Header
        slugs={slugs}
        menuData={headerData}
        stickyMenuData={pageData?.stickyMenu}
      />
      <HomePage data={pageData} />
    </>
  )
}
