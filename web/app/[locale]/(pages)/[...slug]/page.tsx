import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getNameFromLocale } from '@/sanity/helpers/localization'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { PageWrapper } from '@/sanity/pages/PageWrapper'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import { pageMetaQuery } from '@/sanity/queries/metaData'

const MagazinePage = dynamic(() => import('@/templates/magazine/MagazinePage'))
const LandingPage = dynamic(() => import('@/templates/landingpage/LandingPage'))
const EventPage = dynamic(() => import('@/templates/event/Event'))
const NewsPage = dynamic(() => import('@/templates/news/News'))
const TopicPage = dynamic(() => import('@/templates/topic/TopicPage'))

type Props = {
  params: Promise<{ slug: string[]; locale: string }>
  searchParams: Promise<{ [key: string]: string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //array, separated by /. e.g. [news, last slug]
  const { slug, locale } = await params

  const metaData = await sanityFetch({
    query: pageMetaQuery,
    params: {
      lang: getNameFromLocale(locale),
      slug: `/${slug.join('/')}`,
    },
    stega: false,
  })

  return constructSanityMetadata(slug, locale, metaData)
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params
  const { headerData, pageData } = await getPage({
    slug,
    locale,
    tags: ['page', 'event', 'landingPage', 'magazine', 'news', 'localNews'],
  })

  if (!pageData) notFound()

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
      default:
        return <TopicPage {...pageData} />
    }
  }

  return <PageWrapper headerData={headerData}>{getTemplate()}</PageWrapper>
}
