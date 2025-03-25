import Header from '@sections/Header/Header'
import { Layout } from '@sections/Layout/Layout'
import { getStaticBuildRoutePaths } from '../../../common/helpers/getPaths'
import { i18nConfig } from '../../../i18nConfig'
import { getQueryFromSlug } from '../../../lib/queryFromSlug'
import getIntl from '../../../common/helpers/getIntl'
import { getComponentsData } from '../../../lib/fetchData'
import getPageSlugs from '../../../common/helpers/getPageSlugs'
import dynamic from 'next/dynamic'
import ServerIntlProvider from '../../ServerIntlProvider'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
//import { useContext, useEffect } from 'react'
//import { PreviewContext } from '../../../lib/contexts/PreviewContext'
//import { FormattedMessage } from 'react-intl'

const MagazinePage = dynamic(() => import('@templates/magazine/MagazinePage'))
const LandingPage = dynamic(() => import('../../../pageComponents/pageTemplates/LandingPage'))
const EventPage = dynamic(() => import('../../../pageComponents/pageTemplates/Event'))
const NewsPage = dynamic(() => import('../../../pageComponents/pageTemplates/News'))
const TopicPage = dynamic(() => import('../../../pageComponents/pageTemplates/TopicPage'))

export async function generateStaticParams() {
  const { locales } = i18nConfig
  const routePaths = await getStaticBuildRoutePaths([...locales])

  const paths = routePaths.map((path) => ({
    params: { slug: path.slug },
    locale: path.locale,
  }))

  return paths
}

export const dynamicParams = true // fallback to true in app router

/*type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const { id } = await params

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}*/

export default async function Page({ params }: any) {
  const { locale } = await params

  const { query, queryParams } = await getQueryFromSlug(params?.slug as string[], locale)

  const intl = await getIntl(locale, false)

  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query,
      queryParams,
    },
    false,
  )
  if (!pageData) notFound()
  const slugs = getPageSlugs(pageData)
  const hasSticky = pageData?.stickyMenu && pageData?.stickyMenu?.links && pageData?.stickyMenu?.links?.length > 0

  //const router = useRouter()

  //const { setIsPreview } = useContext(PreviewContext)

  /*useEffect(() => {
    setIsPreview(preview)
  }, [setIsPreview, preview])*/

  const slug = pageData?.slug
  /*if (!router.isFallback && !slug && queryParams?.id) {
    return <ErrorPage pageData={pageData} />
  }*/

  const template = pageData?.template || null

  if (!template) console.warn('Missing template for', slug)

  /*if (router.isFallback) {
    return (
      <p>
        <FormattedMessage id="loading" defaultMessage="Loading..." />
      </p>
    )
  }*/

  const getTemplate = () => {
    switch (template) {
      case 'landingPage':
        return <LandingPage data={pageData} />
      case 'event':
        // eslint-disable-next-line react/jsx-no-undef
        return <EventPage data={pageData} />
      case 'news':
      case 'localNews':
        // eslint-disable-next-line react/jsx-no-undef
        return <NewsPage data={pageData} />
      case 'magazine':
        return <MagazinePage data={pageData} />
      default:
        return <TopicPage data={pageData} />
    }
  }

  return (
    <ServerIntlProvider messages={intl?.messages} locale={locale}>
      <Layout footerData={footerData} hasSticky={hasSticky}>
        <>
          <Header slugs={slugs} menuData={menuData} stickyMenuData={pageData?.stickyMenu} />
          {getTemplate()}
        </>
      </Layout>
    </ServerIntlProvider>
  )
}
