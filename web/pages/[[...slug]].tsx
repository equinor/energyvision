/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps, GetStaticPaths } from 'next'
import { sanityClient, getClient } from '../lib/sanity.server'
import { groq } from 'next-sanity'
import { getQueryFromSlug } from '../lib/queryFromSlug'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('../tempcomponents/pages/Home'))

export default function Page({ data, docType }: any) {
  if (docType === 'home') {
    return <HomePage />
  }

  if (!data) {
    return <ErrorPage statusCode={418} />
  }

  return <h1>Amazing page here</h1>
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  if (params && !params.slug) {
    return {
      props: {
        docType: 'home',
      },
    }
  }

  const { query, queryParams, docType } = getQueryFromSlug(params?.slug as string[])
  const pageData = await getClient(preview).fetch(query, queryParams)

  return {
    props: {
      data: { query, queryParams, pageData, docType },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pageQueries = await sanityClient.fetch(groq`*[_type in ["news"] && defined(slug.current)][].slug.current`)

  return {
    paths: pageQueries.map((slug: string) => ({
      params: { slug: slug.split('/').filter((p) => p) },
    })),
    fallback: true,
  }
}
