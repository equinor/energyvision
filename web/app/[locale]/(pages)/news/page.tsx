import { newsSlug } from '@energyvision/shared/satelliteConfig'
import { algoliasearch } from 'algoliasearch'
import type { Metadata } from 'next'
import { cacheLife, cacheTag } from 'next/cache'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { algolia } from '@/lib/config'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getNameFromIso } from '@/sanity/helpers/localization'
import { routeSanityFetch, sanityFetchMetadata } from '@/sanity/lib/fetch'
import { getDynamicFetchOptions } from '@/sanity/lib/live'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { newsroomMetaQuery } from '@/sanity/queries/metaData'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import Header from '@/sections/Header/Header'
import NewsRoomTemplate from '@/templates/newsroom/Newsroom'

const TopicPage = dynamic(() => import('@/templates/topic/TopicPage'))

export async function generateStaticParams() {
  // See https://nextjs.org/docs/messages/empty-generate-static-params for more information
  return Flags.HAS_NEWSROOM ? [{ locale: 'en-GB' }, {locale: "nb-NO"}] : [{ locale: '__placeholder__for_satellites' }]
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const pageSlug = newsSlug[getNameFromIso(locale)]
  if (Flags.HAS_NEWSROOM) {
    const { data: metaData }: { data: any } = await sanityFetchMetadata({
      query: newsroomMetaQuery,
      params: {
        lang: getNameFromIso(locale),
      },
      stega: false,
      requestTag: 'meta-news',
      tags: [`newsroom:${locale}`],
    })

    return constructSanityMetadata(pageSlug, locale, metaData)
  }

  return constructSanityMetadata(pageSlug, locale, undefined)
}

const getInitialResponse =
  // this gets revalidated by path
  async (locale: string) => {
    'use cache'
    cacheLife('max')
    cacheTag('newsroom')
    const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
    const indexName = `${envPrefix}_NEWS_${locale}`

    console.log(
      new Date(),
      'Fetching initial response for',
      indexName,
      'after revalidation',
    )
    const searchClient = algoliasearch(
      algolia.applicationId,
      algolia.searchApiKey,
    )
    const response = await searchClient.searchSingleIndex({
      indexName: indexName,
      searchParams: {
        hitsPerPage: 50,
        facetFilters: ['type:news', 'topicTags:-Crude Oil Assays'],
        facetingAfterDistinct: true,
        facets: ['countryTags', 'topicTags', 'year'],
      },
    })
    return response
  }

export default async function NewsroomPage({
  searchParams,
}: PageProps<'/[locale]/news'>) {
  const dynamic = await getDynamicFetchOptions(await searchParams)
  return <CachedNewsroomPage dynamic={dynamic} />
}

async function CachedNewsroomPage({
  dynamic,
}: {
  dynamic?: Awaited<ReturnType<typeof getDynamicFetchOptions>>
}) {
  'use cache'

  const locale = await getLocale()
  if(locale === "__placeholder__for_satellites"){
     notFound() //https://nextjs.org/docs/messages/empty-generate-static-params
  }

  const [siteMenuResult, pageResults] = await Promise.all([
    routeSanityFetch({
      query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
      params: {
        lang: getNameFromIso(locale) ?? 'en_GB',
      },
      requestTag: 'site-menu',
      stega: false,
      tags: [`siteMenu:${locale}`],
      ...dynamic,
    }),
    getPage({
      slug: newsSlug[getNameFromIso(locale)],
      locale,
      tags: [`newsroom:${locale}`],
      ...dynamic,
    }),
  ])

  const { headerData, pageData } = pageResults
  const { data: siteMenuData } = siteMenuResult || {}

  const response =
    Flags.HAS_NEWSROOM && ['en-GB', 'nb-NO'].includes(locale)
      ? await getInitialResponse(locale)
      : undefined

  return (
    <>
      <Header siteMenuData={siteMenuData} headerData={headerData} />
      <Suspense fallback={<div>Loading...</div>}>
        {Flags.HAS_NEWSROOM && response ? (
          <NewsRoomTemplate
            locale={locale}
            pageData={pageData}
            initialSearchResponse={response}
          />
        ) : (
          // allow '/news' page on other satellite sites
          <TopicPage {...pageData} />
        )}
      </Suspense>
    </>
  )
}
