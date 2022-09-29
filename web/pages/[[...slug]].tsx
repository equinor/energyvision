/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps, GetStaticPaths } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
import { SkipNavContent } from '@reach/skip-nav'
/* import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js' */
import { filterDataToSingleItem } from '../lib/filterDataToSingleItem'
import { getQueryFromSlug } from '../lib/queryFromSlug'
// import { usePreviewSubscription } from '../lib/sanity'
import { Layout } from '../pageComponents/shared/Layout'
import { defaultLanguage } from '../languages'
import Header from '../pageComponents/shared/Header'
import { FormattedMessage } from 'react-intl'
import getIntl from '../common/helpers/getIntl'
import { getRoutePaths } from '../common/helpers/getPaths'
import getPageSlugs from '../common/helpers/getPageSlugs'
import { getComponentsData } from '../lib/fetchData'
import { Flags } from '../common/helpers/datasetHelpers'

const MagazinePage = dynamic(() => import('../pageComponents/pageTemplates/MagazinePage'))
const LandingPage = dynamic(() => import('../pageComponents/pageTemplates/LandingPage'))
const TopicPageV2 = dynamic(() => import('../pageComponents/pageTemplates/TopicPageV2'))
const EventPage = dynamic(() => import('../pageComponents/pageTemplates/Event'))
const NewsPage = dynamic(() => import('../pageComponents/pageTemplates/News'))
const TopicPage = dynamic(() => import('../pageComponents/pageTemplates/TopicPage'))

// @TODO Improve types here, don't use any
export default function Page({ data, preview }: any) {
  /*   const appInsights = useAppInsightsContext()
   */

  const router = useRouter()
  // Let's nuke the preview hook temporarily for performance reasons
  /*   const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.pageData,
    enabled: preview || router.query.preview !== null,
    //  sanity types not updated to beta yet
    // eslint-disable-next-line
    // @ts-ignore
    useGroqBeta: true,
  }) */

  const pageData = data?.pageData?.news
    ? filterDataToSingleItem(data.pageData.news, preview)
    : filterDataToSingleItem(data.pageData, preview)

  const slug = pageData?.slug
  if (!router.isFallback && !slug && !data?.queryParams?.id) {
    return <ErrorPage statusCode={404} />
  }

  //appInsights.trackPageView({ name: slug /* uri: fullUrl */ })

  const template = pageData?.template || null

  // @TODO: How should we handle this in the best possible way?
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
      return <NewsPage data={{ news: pageData, latestNews: data.pageData?.latestNews }} />
    case 'magazine':
      return Flags.IS_DEV ? <MagazinePage data={pageData} /> : <TopicPage data={pageData} />
    default:
      return Flags.IS_DEV ? <TopicPageV2 data={pageData} /> : <TopicPage data={pageData} />
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
        <SkipNavContent />
        {page}
      </>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale = defaultLanguage.locale }) => {
  const { query, queryParams, isNews } = getQueryFromSlug(params?.slug as string[], locale)

  if (Flags.IS_DEV && (params?.slug as string[])?.join('/') === 'test') {
    console.log('Get static props called...')
  }

  const intl = await getIntl(locale, preview)

  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query,
      queryParams,
    },
    preview,
    isNews,
  )

  const notFound = isNews ? pageData.news?.length === 0 || !pageData.news : !pageData

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
    notFound,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const routePaths = await getRoutePaths(locales)

  const paths = routePaths.map((path) => ({
    params: { slug: path.slug },
    locale: path.locale,
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
