import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout, Heading, FormattedDateTime } from '@components'
import { newsQuery, newsSlugsQuery } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import NewsBlockContent from '../../common/NewsBlockContent'
import { IngressBlockRenderer } from '../../common/serializers'

const NewsLayout = styled.div`
  display: grid;
  grid-template-columns: var(--spacer-vertical-medium) 1fr var(--spacer-vertical-medium);
  grid-template-rows: var(--spacer-vertical-medium) min-content min-content 3rem min-content min-content min-content;
  width: 100%;
  &::before {
    content: '';
    background-color: var(--slate-blue-95);
    grid-column: 1/4;
    grid-row: 1/5;
  }
  @media (min-width: 800px) {
    grid-template-columns: minmax(var(--spacer-vertical-xLarge), 1fr) 2rem minmax(auto, 60rem) 2rem minmax(
        var(--spacer-vertical-xLarge),
        1fr
      );
    grid-template-rows: var(--spacer-vertical-xLarge) min-content min-content 6rem min-content min-content min-content;
    &::before {
      grid-column: 1/6;
    }
  }

  @media (min-width: 1100px) {
    grid-template-columns: minmax(var(--spacer-vertical-xLarge), 1fr) 6rem minmax(auto, 60rem) 6rem minmax(
        var(--spacer-vertical-xLarge),
        1fr
      );
  }
  @media (min-width: 1700px) {
    grid-template-columns: minmax(var(--spacer-vertical-xLarge), 1fr) 6rem minmax(auto, 80rem) 6rem minmax(
        var(--spacer-vertical-xLarge),
        1fr
      );
    grid-template-rows: var(--spacer-vertical-xxLarge) min-content min-content 6rem min-content min-content min-content;
    &::before {
      grid-column: 1/6;
    }
  }
`
const StyledHeading = styled(Heading)`
  grid-column: 2 / 3;
  grid-row: 2;
  padding: var(--spacer-vertical-large) 0 var(--spacer-vertical-medium) 0;
  /** Could probably reduce the amount of mq with some more collapsible columns on smaller devices  */
  @media (min-width: 800px) {
    grid-column: 3 / 4;
  }
`

const Date = styled.div`
  grid-column: 2 / 3;
  grid-row: 3;
  color: var(--white-100);
  padding: var(--spacer-vertical-medium) 0;
  @media (min-width: 800px) {
    grid-column: 3 / 4;
  }
`

const Image = styled.div`
  grid-column: 2 / 3;
  grid-row: 4 / 6;
  @media (min-width: 800px) {
    grid-column: 2 / 5;
  }
`

const LeadParagraph = styled.div`
  grid-column: 2 / 3;
  grid-row: 6;
  padding: var(--spacer-vertical-medium) 0;
  @media (min-width: 800px) {
    grid-column: 2 / 5;
  }
  @media (min-width: 1000px) {
    margin: 0 var(--spacer-vertical-xxLarge);
  }
  @media (min-width: 1500px) {
    margin: 0 var(--spacer-vertical-xxxLarge);
  }
`
const Content = styled.div`
  padding: var(--spacer-vertical-medium) 0;
  grid-column: 2 / 3;
  grid-row: 7;
  @media (min-width: 800px) {
    grid-column: 2 / 5;
  }
  @media (min-width: 1000px) {
    margin: 0 var(--spacer-vertical-xxLarge);
  }
  @media (min-width: 1500px) {
    margin: 0 var(--spacer-vertical-xxxLarge);
  }
`

const RatioBox = styled.div`
  position: relative;
  height: 0;
  display: block;
  width: 100%;
  padding-bottom: 50%;
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
  /** TODO: Find out why the first time News is called it is without data */
  if (!data) {
    return <ErrorPage statusCode={418} />
  }
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
              <Date>
                <FormattedDateTime datetime={news.publishDateTime} />
              </Date>
              <Image>
                <RatioBox>
                  <ImagePlaceholder />
                </RatioBox>
              </Image>
              {news.ingress && (
                <LeadParagraph>
                  <SimpleBlockContent
                    blocks={news.ingress}
                    serializers={{
                      types: {
                        block: IngressBlockRenderer,
                      },
                    }}
                  ></SimpleBlockContent>
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
