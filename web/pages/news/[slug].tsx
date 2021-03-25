import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Layout, Heading } from '@components'
import { newsQuery, newsSlugsQuery } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import NewsBlockContent from '../../common/NewsBlockContent'
import { GetStaticProps, GetStaticPaths } from 'next'

const NewsLayout = styled.div`
  display: grid;
  grid-template-columns: var(--spacer-vertical-medium) 1fr var(--spacer-vertical-medium);
  grid-template-rows: auto auto 3rem auto auto auto;
  &::before {
    content: '';
    background-color: var(--slate-blue-95);
    grid-column: 1/4;
    grid-row: 1/4;
  }
`
const StyledHeading = styled(Heading)`
  grid-column: 2 / 3;
  grid-row: 1;
  padding: var(--spacer-vertical-large) 0 var(--spacer-vertical-medium) 0;
`

const Date = styled.div`
  grid-column: 2 / 3;
  grid-row: 2;
  color: var(--white-100);
  padding: var(--spacer-vertical-medium) 0;
`

const Image = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 5;
`

const LeadParagraph = styled.div`
  grid-column: 2 / 3;
  grid-row: 5;
  padding: var(--spacer-vertical-medium) 0;
`
const Content = styled.div`
  padding: var(--spacer-vertical-medium) 0;

  grid-column: 2 / 3;
  grid-row: 6;
`

const RatioBox = styled.div`
  position: relative;
  height: 0;
  display: block;
  width: 100%;
  padding-bottom: 56.25%;
`

const ImagePlaceholder = styled.div`
  background-color: hsl(0, 0%, 86%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
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
              <StyledHeading level="h1" size="2xl" inverted>
                {news.title}
              </StyledHeading>
              <Date>{news.publishDateTime}</Date>
              <Image>
                <RatioBox>
                  <ImagePlaceholder />
                </RatioBox>
              </Image>
              {news.ingress && (
                <LeadParagraph>
                  <SimpleBlockContent blocks={news.ingress}></SimpleBlockContent>
                </LeadParagraph>
              )}
              {news.content && (
                <Content>
                  <NewsBlockContent blocks={news.content}></NewsBlockContent>
                </Content>
              )}
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
