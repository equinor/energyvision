import { magazineSlug, newsSlug } from '@energyvision/shared/satelliteConfig'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { decodeSlugs } from '@/lib/helpers/getFullUrl'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getNameFromIso } from '@/sanity/helpers/localization'
import { routeSanityFetch } from '@/sanity/lib/live'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import {
  docWithSlugMetaQuery,
  magazineroomMetaQuery,
  pageMetaQuery,
} from '@/sanity/queries/metaData'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import Header from '@/sections/Header/Header'

type Props = {
  params: Promise<{ slug: string[]; locale: string }>
  searchParams: Promise<{ [key: string]: string[] | undefined }>
}
const MagazinePage = dynamic(() => import('@/templates/magazine/MagazinePage'))
const EventPage = dynamic(() => import('@/templates/event/Event'))
const NewsPage = dynamic(() => import('@/templates/news/News'))
const TopicPage = dynamic(() => import('@/templates/topic/TopicPage'))
const MagazineRoom = dynamic(() => import('@/templates/magazine/Magazineroom'))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //array, separated by /. e.g. [news, last slug]
  const { slug: encodedSlug, locale } = await params
  const slug = decodeSlugs(encodedSlug) as string[]

  const sanityLang = getNameFromIso(locale)
  //news, magazinepage has slug in document
  const isNewsPage = slug[0] === newsSlug[sanityLang]
  const isMagazineRoom =
    slug?.length === 1 && slug[0] === magazineSlug[sanityLang]
  const isMagazinePage =
    slug?.length > 1 && slug[0] === magazineSlug[sanityLang]
  let type = 'news'
  if (isMagazineRoom || isMagazinePage) {
    type = isMagazineRoom ? 'magazineIndex' : 'magazine'
  }
  let query = pageMetaQuery
  if (isNewsPage || isMagazinePage) {
    query = docWithSlugMetaQuery
  }
  if (isMagazineRoom) {
    query = magazineroomMetaQuery
  }

  const { data: metaData } = await routeSanityFetch({
    query,
    params: {
      lang: sanityLang,
      slug: `/${slug.join('/')}`,
      ...((isNewsPage || isMagazineRoom || isMagazinePage) && { type }),
    },
    stega: false,
    requestTag: 'page-meta',
  })

  console.log('Meta data for', slug, metaData) // Debug log to check the fetched metadata

  return constructSanityMetadata(slug, locale, metaData)
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params
  setRequestLocale(locale)

  const [siteMenuResult, pageResults] = await Promise.all([
    routeSanityFetch({
      query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
      params: {
        lang: getNameFromIso(locale) ?? 'en_GB',
      },
    }),
    getPage({
      slug: decodeSlugs(slug),
      locale,
    }),
  ])

  const { headerData, pageData } = pageResults
  const { data: siteMenuData } = siteMenuResult || {}
  if (Object.keys(pageData).length === 0) notFound()

  const template = pageData?.template
  if (!template || typeof template === 'undefined')
    console.warn('Missing template for', pageData?.slug)

  const getTemplate = () => {
    switch (template) {
      case 'event':
        return <EventPage data={pageData} />
      case 'news':
      case 'localNews':
        return <NewsPage {...pageData} />
      case 'magazine':
        return <MagazinePage {...pageData} />
      case 'magazineIndex':
        return <MagazineRoom {...pageData} />
      default:
        return <TopicPage {...pageData} />
    }
  }
  return (
    <>
      <Header siteMenuData={siteMenuData} headerData={headerData} />
      {getTemplate()}
    </>
  )
}
