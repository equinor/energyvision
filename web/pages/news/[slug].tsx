import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Layout } from '@components'
import { newsQuery, newsSlugsQuery } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import styled from 'styled-components'
import { Typography } from '@equinor/eds-core-react'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { GetStaticProps, GetStaticPaths } from 'next'

const NewsLayout = styled.div`
  display: grid;
`

const Title = styled(Typography)`
  font-size: var(--typeScale-5);
  line-height: 1.2;
`

type Block = {
  _type: string
  children: []
}

type NewsSchema = {
  slug: string
  title: string
  id: string
  publishDateTime: string
  // How should we do this????
  ingress: Block[]
  content: Block[]
}

type ArticleProps = {
  data: {
    news: NewsSchema
  }
  preview: boolean
}

export default function News({ data, preview }: ArticleProps): JSX.Element {
  const router = useRouter()
  const slug = data?.news?.slug
  const {
    data: { news },
  } = usePreviewSubscription(newsQuery, {
    params: { slug },
    initialData: data,
    //enabled: preview && slug,
    enabled: false,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <article>
            <Head>
              <title>{news.title}</title>
            </Head>
            <NewsLayout>
              <Title variant="h1">{news.title}</Title>
              <div>{news.publishDateTime}</div>
              {news.ingress && <SimpleBlockContent blocks={news.ingress}></SimpleBlockContent>}
            </NewsLayout>
          </article>
        </>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const { news } = await getClient(preview).fetch(newsQuery, {
    slug: params?.slug,
  })

  return {
    props: {
      preview,
      data: {
        news,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(newsSlugsQuery)
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  }
}
