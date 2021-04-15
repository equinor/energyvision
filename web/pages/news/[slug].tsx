import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout, Heading, FormattedDateTime } from '@components'
import styled from 'styled-components'
import { newsQuery, newsSlugsQuery } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import NewsBlockContent from '../../common/NewsBlockContent'
import HeroImage from '../../tempcomponents/news/HeroImage'
import Lead from '../../tempcomponents/news/Lead'
import RelatedContent from '../../tempcomponents/news/RelatedContent'
import LatestNews from '../../tempcomponents/news/LatestNews'
import type { NewsCardData, NewsSchema } from '../../types/types'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'

const NewsLayoutAlt = styled.div`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 210px);
`

const Header = styled.div`
  background: var(--slate-blue-95);
  padding: var(--banner-paddingVertical) var(--banner-paddingHorizontal);
`

const HeaderInner = styled.div`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const StyledHeadingAlt = styled(Heading)`
  margin: 0;
`

const DateAlt = styled.div`
  color: var(--white-100);
  margin-top: var(--space-xxLarge);
  margin-bottom: var(--space-xxLarge);
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: var(--space-small);
`

const DateContainer = styled.div`
  overflow-wrap: break-word;
  line-height: var(--lineHeight-3);
`

const LastModifiedLabel = styled.span`
  margin: 0 var(--space-small);

  &:before {
    content: '|';
    margin-right: var(--space-small);
  }
`

const ImageAlt = styled.div`
  padding: 0 clamp(16px, calc(-38.3689px + 14.4984vw), 240px);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(var(--banner-paddingVertical) * -1);
  & > figure {
    margin: 0;
  }
`

/** ------------------------------------------ */

const NewsLayout = styled.div`
  display: grid;
  grid-template-columns: var(--spacing-medium) 1fr var(--spacing-medium);
  grid-template-rows: min-content min-content min-content min-content 3rem;
  width: 100%;
  &::before {
    /* content: '';
    background-color: var(--slate-blue-95);
    grid-column: 1/4;
    grid-row: 1/5; */
  }
  @media (min-width: 800px) {
    grid-template-columns: minmax(var(--spacing-xLarge), 1fr) 2rem minmax(auto, 60rem) 2rem minmax(
        var(--spacing-xLarge),
        1fr
      );
    grid-template-rows: min-content min-content min-content min-content 5rem;
    /*     &::before {
      grid-column: 1/6;
    } */
  }

  @media (min-width: 1100px) {
    grid-template-columns: minmax(var(--spacing-xLarge), 1fr) 6rem minmax(auto, 60rem) 6rem minmax(
        var(--spacing-xLarge),
        1fr
      );
  }
  @media (min-width: 1700px) {
    grid-template-columns: minmax(var(--spacing-xLarge), 1fr) 4rem minmax(auto, 32rem) 4rem minmax(
        var(--spacing-xLarge),
        1fr
      );
    grid-template-rows: min-content min-content min-content min-content 5rem;
    /* &::before {
      grid-column: 1/6;
    } */
  }
`
/** eslint */
// eslint-disable-next-line no-unused-vars
const StyledHeading = styled(Heading)`
  grid-column: 2 / 3;
  grid-row: 2;
  padding: var(--spacing-large) 0 var(--spacing-medium) 0;
  /** Could probably reduce the amount of mq with some more collapsible columns on smaller devices  */
  @media (min-width: 800px) {
    grid-column: 3 / 4;
  }
`
// eslint-disable-next-line no-unused-vars
const Date = styled.div`
  grid-column: 2 / 3;
  grid-row: 3;
  color: var(--white-100);
  padding: var(--spacing-medium) 0;
  @media (min-width: 800px) {
    grid-column: 3 / 4;
  }
`
// eslint-disable-next-line no-unused-vars
const Image = styled.div`
  grid-column: 2 / 3;
  grid-row: 4 / 6;
  @media (min-width: 800px) {
    grid-column: 2 / 5;
  }
`

const LeadParagraph = styled.div`
  grid-column: 2 / 3;
  grid-row: 1;
  padding: var(--spacing-medium) 0;
  @media (min-width: 800px) {
    grid-column: 2 / 5;
  }
  @media (min-width: 1000px) {
    margin: 0 var(--spacing-xxLarge);
  }
  @media (min-width: 1500px) {
    margin: 0 var(--spacing-xxxLarge);
  }
`
const Content = styled.div`
  padding: var(--spacing-medium) 0;
  grid-column: 2 / 3;
  grid-row: 2;
  @media (min-width: 800px) {
    grid-column: 3 / 4;
  }
  @media (min-width: 1000px) {
    margin: 0 var(--spacing-xxLarge);
  }
  @media (min-width: 1500px) {
    margin: 0 var(--spacing-xxxLarge);
  }
`

const Related = styled.div`
  grid-column: 2 / 3;
  grid-row: 3;
  padding: var(--spacing-large) 0 var(--spacing-medium) 0;
  /** Could probably reduce the amount of mq with some more collapsible columns on smaller devices  */
  @media (min-width: 800px) {
    grid-column: 3 / 4;
  }
`
const Latest = styled.div`
  grid-column: 2 / 3;
  grid-row: 4;
  @media (min-width: 800px) {
    grid-column: 2 / 5;
  }
`

type ArticleProps = {
  data: {
    news: NewsSchema
    latestNews: NewsCardData[]
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
    enabled: preview || router.query.preview !== null,
    //enabled: true,
    //enabled: false,
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
            <NewsLayoutAlt>
              <Header>
                <HeaderInner>
                  <StyledHeadingAlt level="h1" size="2xl" inverted>
                    {news.title}
                  </StyledHeadingAlt>
                  <DateAlt>
                    <Icon data={calendar} />
                    <DateContainer>
                      <FormattedDateTime datetime={news.publishDateTime} />
                      <LastModifiedLabel>LAST MODIFIED:</LastModifiedLabel>
                      <FormattedDateTime datetime={news.updatedAt} />
                    </DateContainer>
                  </DateAlt>
                </HeaderInner>
              </Header>
              <ImageAlt>{news.heroImage && <HeroImage data={news.heroImage} />}</ImageAlt>
            </NewsLayoutAlt>
            <NewsLayout>
              {/*<StyledHeading level="h1" size="2xl" inverted>
                {news.title}
              </StyledHeading>
              <Date>
                <FormattedDateTime datetime={news.publishDateTime} />
              </Date>
              <Image>{news.heroImage && <HeroImage data={news.heroImage} />}</Image>*/}
              {news.ingress && (
                <LeadParagraph>
                  <Lead blocks={news.ingress} />
                </LeadParagraph>
              )}
              {news.content && (
                <Content>
                  <NewsBlockContent blocks={news.content}></NewsBlockContent>
                </Content>
              )}
              {news.relatedLinks.links && news.relatedLinks.links.length > 0 && (
                <Related>
                  <RelatedContent data={news.relatedLinks} />
                </Related>
              )}
              {latestNews.length > 0 && (
                <Latest>
                  <LatestNews data={latestNews} />
                </Latest>
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
