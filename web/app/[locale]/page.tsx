import { stegaClean } from '@sanity/client/stega'
import type { Metadata } from 'next'
import { cacheLife } from 'next/cache'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { OrganizationJsonLd } from 'next-seo'
import { Suspense } from 'react'
import { getValidLanguagesLocales } from '@/languageConfig'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getNameFromIso } from '@/sanity/helpers/localization'
import { routeSanityFetch, sanityFetchMetadata } from '@/sanity/lib/fetch'
import { getDynamicFetchOptions } from '@/sanity/lib/live'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { homePageMetaQuery } from '@/sanity/queries/metaData'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import Header from '@/sections/Header/Header'
import HomePage from '@/templates/homepage/HomePage'
import { FriendlyCaptchaSdkWrapper } from './FriendlyCaptchaWrapper'

export function generateStaticParams() {
  return getValidLanguagesLocales().map(locale => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { data: metaData }: { data: any } = await sanityFetchMetadata({
    query: homePageMetaQuery,
    params: {
      lang: getNameFromIso(locale),
    },
    perspective: 'published',
  })

  return constructSanityMetadata('', locale, metaData)
}

// Layer 1: branches on draft mode without awaiting any other dynamic API,
// so the published route still prerenders into the static shell.
export default async function Home(_: PageProps<'/[locale]'>) {
  const { isEnabled: isDraftMode } = await draftMode()

  if (isDraftMode) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicHome />
      </Suspense>
    )
  }

  return <CachedHome />
}

// Layer 2: only reached in draft mode, marks the fetch below as uncached/stega-aware.
async function DynamicHome() {
  const dynamic = await getDynamicFetchOptions()
  return <CachedHome isDraftMode dynamic={dynamic} />
}

// Layer 3: fetches through the existing draft-aware/cached `routeSanityFetch`/`getPage`.
async function CachedHome({
  isDraftMode = false,
  dynamic,
}: {
  isDraftMode?: boolean
  dynamic?: Awaited<ReturnType<typeof getDynamicFetchOptions>>
}) {
  'use cache'
  cacheLife('max')
  const locale = await getLocale()

  const [siteMenuResult, homePageData] = await Promise.all([
    routeSanityFetch({
      query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
      params: {
        lang: getNameFromIso(locale) ?? 'en_GB',
      },
      tags: [`sanity:siteMenu:${locale}`],
      requestTag: 'site-menu',
      ...dynamic,
    }),
    getPage({
      slug: '',
      locale,
      tags: ['homePage'],
      ...dynamic,
    }),
  ])

  //Later when inside presentation tool, cant clean as it doesnt work with visual editing, must filter props together with visual editing,
  const pageContent = isDraftMode ? stegaClean(homePageData) : homePageData

  const { headerData, pageData } = pageContent
  const { data: siteMenuData } = siteMenuResult || {}

  if (!pageData) notFound()

  const template = pageData?.template || null

  if (!template) console.warn('Missing homepage template', pageData?.slug)

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  )
}
