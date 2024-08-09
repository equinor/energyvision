/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps, GetStaticPaths } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
/* import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js' */
import { getQueryFromSlug } from '../lib/queryFromSlug'
import { Layout } from '../pageComponents/shared/Layout'
import { defaultLanguage } from '../languages'
import Header from '../pageComponents/shared/Header'
import { FormattedMessage } from 'react-intl'
import getIntl from '../common/helpers/getIntl'
import { getStaticBuildRoutePaths } from '../common/helpers/getPaths'
import getPageSlugs from '../common/helpers/getPageSlugs'
import { getComponentsData } from '../lib/fetchData'
import { useContext, useEffect } from 'react'
import { PreviewContext } from '../lib/contexts/PreviewContext'

const MagazinePage = dynamic(() => import('../pageComponents/pageTemplates/MagazinePage'))
const LandingPage = dynamic(() => import('../pageComponents/pageTemplates/LandingPage'))
const EventPage = dynamic(() => import('../pageComponents/pageTemplates/Event'))
const NewsPage = dynamic(() => import('../pageComponents/pageTemplates/News'))
const TopicPage = dynamic(() => import('../pageComponents/pageTemplates/TopicPage'))

// @TODO Improve types here, don't use any
export default function Page({ data, preview = false }: any) {
  const router = useRouter()

  const { setIsPreview } = useContext(PreviewContext)

  useEffect(() => {
    setIsPreview(preview)
  }, [setIsPreview, preview])

  const { pageData } = data

  const slug = pageData?.slug
  if (!router.isFallback && !slug && !data?.queryParams?.id) {
    return <ErrorPage statusCode={404} />
  }

  const template = pageData?.template || null

  if (!template) console.warn('Missing template for', slug)

  if (router.isFallback) {
    return (
      <p>
        <FormattedMessage id="loading" defaultMessage="Loading..." />
      </p>
    )
  }

  switch (template) {
    case 'landingPage':
      return <LandingPage data={pageData} />
    case 'event':
      return <EventPage data={pageData} />
    case 'news':
    case 'localNews':
      return <NewsPage data={pageData} />
    case 'magazine':
      return <MagazinePage data={pageData} />
    default:
      return <TopicPage data={pageData} />
  }
}

// eslint-disable-next-line react/display-name
Page.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data, preview } = props

  const slugs = getPageSlugs(data)

  return (
    <Layout footerData={data?.footerData} intl={data?.intl} preview={preview}>
      <>
        <Header slugs={slugs} menuData={data?.menuData} />
        {page}
      </>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale = defaultLanguage.locale }) => {
  const { query, queryParams } = await getQueryFromSlug(params?.slug as string[], locale)

  const intl = await getIntl(locale, preview)

  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query,
      queryParams,
    },
    preview,
  )

  return {
    props: {
      preview,
      data: {
        query,
        queryParams,
        pageData,
        menuData,
        footerData,
        intl,
      },
    },
    revalidate: 60,
    notFound: !pageData,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  // Not changing getRoutePaths(locales) because its used in sitemap.xml
  const routePaths = await getStaticBuildRoutePaths(locales)

  const paths = routePaths.map((path) => ({
    params: { slug: path.slug },
    locale: path.locale,
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
