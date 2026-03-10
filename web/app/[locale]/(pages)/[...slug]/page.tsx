import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getNameFromLocale } from '@/sanity/helpers/localization'
import { routeSanityFetch } from '@/sanity/lib/live'
import { PageWrapper } from '@/sanity/pages/PageWrapper'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import {
  docWithSlugMetaQuery,
  magazineroomMetaQuery,
  pageMetaQuery,
} from '@/sanity/queries/metaData'
import { magazineSlug, newsSlug } from '@/sitesConfig'

type Props = {
  params: Promise<{ slug: string[]; locale: string }>
  searchParams: Promise<{ [key: string]: string[] | undefined }>
}
const MagazinePage = dynamic(() => import('@/templates/magazine/MagazinePage'))
const LandingPage = dynamic(() => import('@/templates/landingpage/LandingPage'))
const EventPage = dynamic(() => import('@/templates/event/Event'))
const NewsPage = dynamic(() => import('@/templates/news/News'))
const TopicPage = dynamic(() => import('@/templates/topic/TopicPage'))
const MagazineRoom = dynamic(() => import('@/templates/magazine/Magazineroom'))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //array, separated by /. e.g. [news, last slug]
  const { slug, locale } = await params
  const sanityLang = getNameFromLocale(locale)
  //news, magazinepage has slug in document
  const isNewsPage = slug[0] === newsSlug[sanityLang]
  const isMagazineRoom =
    slug?.length === 1 && slug[0] === magazineSlug[sanityLang]
  const isMagazinePage =
    slug?.length > 1 && slug[0] === magazineSlug[sanityLang]
  let type = 'news'
  if (isMagazineRoom || isMagazinePage) {
    type = isMagazineRoom ? 'magazinIndex' : 'magazine'
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
  })

  return constructSanityMetadata(slug, locale, metaData)
}

export default async function Page({ params, searchParams }: Props) {
  const { slug, locale } = await params
  const search = await searchParams

  const { headerData, pageData } = await getPage({
    slug,
    locale,
    tags: [
      'page',
      'event',
      'landingPage',
      'magazine',
      'magazinIndex',
      'news',
      'localNews',
    ],
    searchParams: search,
  })
  if (Object.keys(pageData).length === 0) notFound()

  const template = pageData?.template
  if (!template || typeof template === 'undefined')
    console.warn('Missing template for', pageData?.slug)

  const getTemplate = () => {
    switch (template) {
      case 'landingPage':
        return <LandingPage data={pageData} />
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
  return <PageWrapper headerData={headerData}>{getTemplate()}</PageWrapper>
}
