import { stegaClean } from '@sanity/client/stega'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { OrganizationJsonLd } from 'next-seo'
import { languages } from '@/languageConfig'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getNameFromIso } from '@/sanity/helpers/localization'
import { routeSanityFetch } from '@/sanity/lib/live'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { homePageMetaQuery } from '@/sanity/queries/metaData'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import Header from '@/sections/Header/Header'
import HomePage from '@/templates/homepage/HomePage'
import { FriendlyCaptchaSdkWrapper } from './FriendlyCaptchaWrapper'

type Props = {
  params: Promise<{ slug: string; locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const { data: metaData }: { data: any } = await routeSanityFetch({
    query: homePageMetaQuery,
    params: {
      lang: getNameFromIso(locale),
    },
    requestTag: 'meta-home',
    stega: false,
  })

  return constructSanityMetadata('', locale, metaData)
}

export default async function Home({ params }: Props) {
  const { locale, slug } = await params
  //const isInPresentationToolContext =
  //  (await cookies()).get('preview-fetch-dest')?.value === 'iframe'
  // Enable static rendering
  setRequestLocale(locale)
  const { isEnabled: isDraftMode } = await draftMode()

  if (!languages.map(it => it.iso).includes(locale)) notFound()
  let pageContent = null
  const [siteMenuResult, homePageData] = await Promise.all([
    routeSanityFetch({
      query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
      params: {
        lang: getNameFromIso(locale) ?? 'en_GB',
      },
    }),
    getPage({
      slug,
      locale,
      tags: ['homePage'],
    }),
  ])
  pageContent = homePageData
  if (isDraftMode) {
    //Later when inside presentation tool, cant clean as it doesnt work with visual editing, must filter props together with visual editing,
    pageContent = stegaClean(homePageData)
  }

  const { headerData, pageData } = pageContent
  const { data: siteMenuData } = siteMenuResult || {}

  if (!pageData) notFound()

  const template = pageData?.template || null

  if (!template) console.warn('Missing homepage template', pageData?.slug)

  return (
    <FriendlyCaptchaSdkWrapper>
      <Header siteMenuData={siteMenuData} headerData={headerData} />
      <OrganizationJsonLd
        name='Equinor ASA'
        url='https://www.equinor.com'
        logo='https://cdn.eds.equinor.com/logo/equinor-logo-horizontal.svg#red'
        description={pageData?.seoAndSome?.metaDescription}
        sameAs={[
          'https://twitter.com/Equinor',
          'https://facebook.com/Equinor',
          'https://linkedin.com/company/equinor',
          'https://www.instagram.com/equinor/',
          'https://www.youtube.com/equinor',
        ]}
      />
      <HomePage headerData={headerData} {...pageData} />
    </FriendlyCaptchaSdkWrapper>
  )
}
