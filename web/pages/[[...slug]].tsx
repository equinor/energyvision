/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps, GetStaticPaths } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { groq } from 'next-sanity'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
import { SkipNavContent } from '@reach/skip-nav'
/* import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js' */
import { sanityClient, getClient } from '../lib/sanity.server'
import { filterDataToSingleItem } from '../lib/filterDataToSingleItem'
import { menuQuery } from '../lib/queries/menu'
import { simpleMenuQuery } from '../lib/queries/simpleMenu'
import { footerQuery } from '../lib/queries/footer'
import { getQueryFromSlug } from '../lib/queryFromSlug'
// import { usePreviewSubscription } from '../lib/sanity'
import { Layout } from '../pageComponents/shared/Layout'
import { getNameFromLocale, defaultLanguage } from '../lib/localization'
import Header from '../pageComponents/shared/Header'
import { AllSlugsType } from '../pageComponents/shared/LocalizationSwitch'
import languages from '../languages'

const LandingPage = dynamic(() => import('../pageComponents/pageTemplates/LandingPage'))
const TopicPage = dynamic(() => import('../pageComponents/pageTemplates/TopicPage'))
const OldTopicPage = dynamic(() => import('../pageComponents/pageTemplates/OldTopicPage'))
const EventPage = dynamic(() => import('../pageComponents/pageTemplates/Event'))

const getValidSlugs = (allSlugs: AllSlugsType) => {
  if (!allSlugs) return []
  const validLanguages = languages.map((lang) => lang.name)
  return allSlugs.filter((slug) => validLanguages.includes(slug.lang))
}
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

  const pageData = filterDataToSingleItem(data.pageData, preview)

  const slug = pageData?.slug

  if (!router.isFallback && !slug && !data?.queryParams?.id) {
    return <ErrorPage statusCode={404} />
  }

  //appInsights.trackPageView({ name: slug /* uri: fullUrl */ })

  if (data?.isArchivedFallback) {
    return <>{router.isFallback ? <p>Loading…</p> : <OldTopicPage data={pageData} />}</>
  }

  const template = pageData?.template || null

  // @TODO: How should we handle this in the best possible way?
  if (!template) console.warn('Missing template for', slug)

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  switch (template) {
    case 'landingPage':
      return <LandingPage data={pageData} />
    case 'event':
      return <EventPage data={pageData} />
    default:
      return <TopicPage data={pageData} />
  }
}

// eslint-disable-next-line react/display-name
Page.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subcscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page

  const { data, preview } = props

  const slugs = getValidSlugs((data?.pageData?.slugs?.allSlugs as AllSlugsType) || [])

  return (
    <Layout footerData={data?.footerData} preview={preview}>
      <Header slugs={slugs} menuData={data?.menuData} simpleMenuData={data?.simpleMenuData || {}} />
      {/*console.log(data?.simpleMenuData) */}
      <SkipNavContent />
      {page}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale = defaultLanguage.locale }) => {
  const { query, queryParams } = getQueryFromSlug(params?.slug as string[], locale)
  const data = query && (await getClient(preview).fetch(query, queryParams))

  const pageData = filterDataToSingleItem(data, preview) || null

  // @TODO Let's do it simple stupid and iterate later on
  const menuData = await getClient(preview).fetch(menuQuery, { lang: getNameFromLocale(locale) })
  const simpleMenuData = await getClient(preview).fetch(simpleMenuQuery, { lang: getNameFromLocale(locale) })

  const footerData = await getClient(preview).fetch(footerQuery, { lang: getNameFromLocale(locale) })
  if ((!pageData && !queryParams?.id) || (params?.slug === 'news' && !pageData.news)) {
    const { getArchivedPageData } = await import('../common/helpers/staticPageHelpers')

    const slug = params?.slug ? (params?.slug as string[]).join('/') : '/'

    const archivedData = await getArchivedPageData(locale, slug)
    return {
      props: {
        preview: false,
        data: {
          isArchivedFallback: true,
          pageData: { slug: slug, ...archivedData },
          menuData,
          simpleMenuData,
          footerData,
        },
      },
      revalidate: 300,
    }
  }

  return {
    props: {
      preview,
      data: {
        isArchivedFallback: false,
        query,
        queryParams,
        pageData,
        menuData,
        simpleMenuData,
        footerData,
      },
    },
    revalidate: 120,
  }
}

export const getTopicRoutesForLocale = async (locale: string) => {
  const lang = getNameFromLocale(locale)
  const data = await sanityClient.fetch(groq`*[_type == "route_" + $lang && defined(slug.current)][].slug.current`, {
    lang,
  })

  return data
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getTopicRoutesForLocale(locale)
    return pages.map((slug: string) => ({
      params: { slug: slug.split('/').filter((p) => p) },
      locale,
    }))
  })
  const paths = await Promise.all(fetchPaths)

  return {
    paths: paths.flat(),
    fallback: 'blocking',
  }
}
