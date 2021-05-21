/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { sanityClient, getClient } from '../lib/sanity.server'
import { groq } from 'next-sanity'
import { getQueryFromSlug } from '../lib/queryFromSlug'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
import { usePreviewSubscription } from '../lib/sanity'
import { Layout } from '@components'

const HomePage = dynamic(() => import('../tempcomponents/pages/Home'))
const TopicPage = dynamic(() => import('../tempcomponents/pages/TopicPage'))

export default function Page({ data, preview }: any) {
  const router = useRouter()
  const slug = data?.pageData?.slug

  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.pageData,
    enabled: preview || router.query.preview !== null,
  })

  // console.log('docType in page', data?.docType)
  if (data?.docType === 'home') {
    return <HomePage />
  }

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout preview={preview}>
        {router.isFallback ? <p>Loading…</p> : <>{data?.docType === 'page' && <TopicPage data={pageData} />}</>}
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  //console.log('params', params)
  const { query, queryParams, docType } = getQueryFromSlug(params?.slug as string[])
  const pageData = query && (await getClient(preview).fetch(query, queryParams))

  //console.log('query:', query)
  //console.log('queryParams:', queryParams)
  //console.log('docType:', docType)
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

export const getStaticPaths: GetStaticPaths = async () => {
  const pageQueries = await sanityClient.fetch(groq`*[_type match "page_*" && defined(slug.current)][].slug.current`)

  return {
    paths: pageQueries.map((slug: string) => ({
      params: { slug: slug.split('/').filter((p) => p) },
    })),
    fallback: true,
  }
}
