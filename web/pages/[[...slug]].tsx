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
import { menuQuery } from '../lib/queries/menu'
import { footerQuery } from '../lib/queries/footer'
import { getQueryFromSlug } from '../lib/queryFromSlug'
import { usePreviewSubscription } from '../lib/sanity'
import { Layout } from '../pageComponents/shared/Layout'
import { mapLocaleToLang } from '../lib/localization'
import Header from '../pageComponents/shared/Header'

const LandingPage = dynamic(() => import('../pageComponents/pageTemplates/LandingPage'))
const TopicPage = dynamic(() => import('../pageComponents/pageTemplates/TopicPage'))
const OldTopicPage = dynamic(() => import('../pageComponents/pageTemplates/OldTopicPage'))
const EventPage = dynamic(() => import('../pageComponents/pageTemplates/Event'))

export default function Page({ data, preview }: any) {
  /*   const appInsights = useAppInsightsContext()
   */
  const router = useRouter()
  const slug = data?.pageData?.slug
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.pageData,
    enabled: preview || router.query.preview !== null,
  })

  if (!router.isFallback && !slug && !data?.queryParams?.id) {
    return <ErrorPage statusCode={404} />
  }

  //appInsights.trackPageView({ name: slug /* uri: fullUrl */ })

  if (data?.isArchivedFallback) {
    return <>{router.isFallback ? <p>Loading…</p> : <OldTopicPage data={data.pageData} />}</>
  }

  const template = data?.pageData.template || null

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

  const slugs = {
    en_GB: data?.pageData?.allSlugs?.en_GB,
    nb_NO: data?.pageData?.allSlugs?.nb_NO,
  }
  return (
    <Layout footerData={data?.footerData} preview={preview}>
      <Header slugs={slugs} data={data?.menuData} />

      <SkipNavContent />
      {page}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale = 'en' }) => {
  const { query, queryParams } = getQueryFromSlug(params?.slug as string[], locale)
  const pageData = query && (await getClient(preview).fetch(query, queryParams))
  // Let's do it simple stupid and iterate later on
  const menuData = await getClient(preview).fetch(menuQuery, { lang: mapLocaleToLang(locale) })
  const footerData = await getClient(preview).fetch(footerQuery, { lang: mapLocaleToLang(locale) })

  // Don't do this at home! Temp. hack to see the static version of all news
  if (!pageData || (params?.slug === 'news' && !pageData.news)) {
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
        footerData,
      },
    },
    revalidate: 120,
  }
}

export const getTopicRoutesForLocale = async (locale: string) => {
  const lang = mapLocaleToLang(locale)
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
