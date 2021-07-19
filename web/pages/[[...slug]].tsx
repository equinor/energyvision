/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { sanityClient, getClient } from '../lib/sanity.server'
import { groq } from 'next-sanity'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { getQueryFromSlug } from '../lib/queryFromSlug'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
import { usePreviewSubscription } from '../lib/sanity'
import { Layout } from '@components'
import getOpenGraphImages from '../common/helpers/getOpenGraphImages'
import { mapLocaleToLang } from '../lib/localization'
import { Menu } from '../tempcomponents/shared/Menu'
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js"

const HomePage = dynamic(() => import('../tempcomponents/pageTemplates/Home'))
const TopicPage = dynamic(() => import('../tempcomponents/pageTemplates/TopicPage'))
const { publicRuntimeConfig } = getConfig()

export default function Page({ data, preview }: any) {
  const appInsights = useAppInsightsContext()
  const router = useRouter()
  const slug = data?.pageData?.slug
  const { pathname } = useRouter()
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.pageData,
    enabled: preview || router.query.preview !== null,
  })
  //console.log('page data', pageData, data)
  if (data?.docType === 'home') {
    return <HomePage />
  }

  if (!router.isFallback && !slug && !data?.queryParams?.id) {
    return <ErrorPage statusCode={404} />
  }

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('/[[...slug]]', slug)

  const localization = {
    activeLocale: router.locale || 'en',
    slugs: {
      en_GB: data?.pageData?.allSlugs?.en_GB.current,
      nb_NO: data?.pageData?.allSlugs?.nb_NO.current,
    },
  }

  appInsights.trackPageView({ name: slug, uri: fullUrl })

  return (
    <>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <NextSeo
            title={pageData?.seoAndSome?.documentTitle || pageData?.title}
            description={pageData?.seoAndSome?.metaDescription}
            openGraph={{
              title: pageData?.title,
              description: pageData?.seoAndSome?.metaDescription,
              type: 'website',
              url: fullUrl,
              /* @TODO: Add fallback image */
              images: getOpenGraphImages(pageData?.seoAndSome?.openGraphImage),
            }}
            twitter={{
              handle: '@handle',
              site: '@site',
              cardType: 'summary_large_image',
            }}
          ></NextSeo>
          <Layout preview={preview}>
            <Menu localization={localization} />
            {data?.docType === 'page' && <TopicPage data={pageData} />}
          </Layout>
        </>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale }) => {
  const { query, queryParams, docType } = getQueryFromSlug(params?.slug as string[], locale)

  const pageData = query && (await getClient(preview).fetch(query, queryParams))

  // console.log('query:', query)
  // console.log('queryParams:', queryParams)
  // console.log('docType:', docType)
  // console.log('data', pageData)

  return {
    props: {
      preview,
      data: {
        query,
        queryParams,
        pageData,
        docType,
      },
    },
    revalidate: 1,
  }
}

export const getTopicRoutesForLocale = async (locale: string) => {
  const lang = mapLocaleToLang(locale)
  const data = await sanityClient.fetch(
    groq`*[_type == "route" && defined(slug[$lang].current)][].slug[$lang].current`,
    {
      lang,
    },
  )
  return data
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getTopicRoutesForLocale(locale)
    return pages.map((slug: string) => ({
      params: { slug: slug.split('/').filter((p) => p) }, locale
    }))
  })
  const paths = await Promise.all(fetchPaths)

  return {
    paths: paths.flat(),
    fallback: true,
  }
}
