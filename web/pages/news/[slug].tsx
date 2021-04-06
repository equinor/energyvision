import Head from 'next/head'
import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import ErrorPage from 'next/error'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout, Heading, FormattedDateTime, RelatedContent, Link, List, Card, FormattedDate } from '@components'
import { newsQuery, newsSlugsQuery } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import NewsBlockContent from '../../common/NewsBlockContent'
import { IngressBlockRenderer } from '../../common/serializers'

const { Links } = RelatedContent
const { Item } = List
const { Title, Header, Action, Arrow, Media, CardLink, Text, Eyebrow } = Card

const NewsLayout = styled.div`
  display: grid;
  grid-template-columns: var(--spacer-vertical-medium) 1fr var(--spacer-vertical-medium);
  grid-template-rows: var(--spacer-vertical-medium) min-content min-content 3rem min-content min-content min-content min-content min-content 3rem;
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
    grid-template-rows: var(--spacer-vertical-xLarge) min-content min-content 6rem min-content min-content min-content min-content min-content 5rem;
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
    grid-template-rows: var(--spacer-vertical-xxLarge) min-content min-content 6rem min-content min-content min-content min-content min-content 5rem;
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

const Related = styled.div`
  grid-column: 2 / 3;
  grid-row: 8;
  padding: var(--spacer-vertical-large) 0 var(--spacer-vertical-medium) 0;
  /** Could probably reduce the amount of mq with some more collapsible columns on smaller devices  */
  @media (min-width: 800px) {
    grid-column: 3 / 4;
  }
`
const LatestNews = styled.div`
  grid-column: 2 / 3;
  grid-row: 9;
  @media (min-width: 800px) {
    grid-column: 2 / 5;
  }
`

const TempWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

const ImagePlaceholder = styled.div`
  background-color: hsl(0, 0%, 86%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  /* TODO: Fix border radius on image */
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const RatioBox1to2 = styled.div`
  position: relative;
  height: 0;
  display: block;
  width: 100%;
  padding-bottom: 50%;
`

const RatioBox = styled.div`
  position: relative;
  height: 0;
  display: block;
  width: 100%;
  padding-bottom: 56.25%;
`

type Block = {
  _type: string
  children: []
}

type Link = {
  type: string
  id: string
  label: string
  link?: { slug: string; type: string }
  href?: string
}

type RelatedLinks = {
  title: string
  links: Link[]
}

type NewsCard = {
  slug: string
  title: string
  id: string
  publishDateTime: string
  // How should we do this????
  ingress: Block[]
}

type NewsSchema = {
  slug: string
  title: string
  id: string
  publishDateTime: string
  // How should we do this????
  ingress: Block[]
  content: Block[]
  relatedLinks: RelatedLinks
}

type ArticleProps = {
  data: {
    news: NewsSchema
    latestNews: NewsCard[]
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
    data: { news, latestNews },
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
                <RatioBox1to2>
                  <ImagePlaceholder />
                </RatioBox1to2>
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
              {news.relatedLinks && (
                <Related>
                  <RelatedContent>
                    <Heading size="lg" level="h2" center>
                      {news.relatedLinks.title}
                    </Heading>
                    <Links>
                      {news.relatedLinks.links.length > 0 &&
                        news.relatedLinks.links.map((item) => {
                          const isExternal = item.type === 'externalUrl'
                          // @TODO: a generic way to resolve internal links?
                          // @TODO: Both external and internal links are wrapped in next/link
                          const href = item.type === 'externalUrl' ? item.href : `/news/${item.link?.slug}`
                          return (
                            <Item key={item.id}>
                              {/*  @TODO: What if href is undefined?  */}
                              <Link variant="contentLink" href={href || '/'} external={isExternal}>
                                {item.label}
                              </Link>
                            </Item>
                          )
                        })}
                    </Links>
                  </RelatedContent>
                </Related>
              )}

              {latestNews.length > 0 && (
                <LatestNews>
                  <Heading size="xl" level="h2" center>
                    Latest news
                  </Heading>
                  <TempWrapper>
                    {latestNews.map((newsItem: NewsCard) => {
                      const { slug, title, id, ingress, publishDateTime } = newsItem
                      return (
                        <NextLink href={`/news/${slug}`} key={id}>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <CardLink>
                            <Card>
                              <Media>
                                <RatioBox>
                                  <ImagePlaceholder />
                                </RatioBox>
                              </Media>
                              <Header>
                                <Eyebrow>
                                  <FormattedDate datetime={publishDateTime} />
                                </Eyebrow>
                                <Title>{title}</Title>
                              </Header>
                              <Text>
                                <SimpleBlockContent blocks={ingress}></SimpleBlockContent>
                              </Text>
                              <Action>
                                <Arrow />
                              </Action>
                            </Card>
                          </CardLink>
                        </NextLink>
                      )
                    })}
                  </TempWrapper>
                </LatestNews>
              )}
            </NewsLayout>
          </article>
        </>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const { news, latestNews } = await getClient(preview).fetch(newsQuery, {
    slug: params?.slug,
  })

  return {
    props: {
      preview,
      data: {
        news,
        latestNews,
      },
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(newsSlugsQuery)
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  }
}
