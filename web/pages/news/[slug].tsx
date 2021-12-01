import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticProps, GetStaticPaths } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { Layout, Heading, FormattedDateTime } from '@components'
import styled from 'styled-components'
import { newsQuery, newsSlugsQuery } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import NewsBlockContent from '../../common/NewsBlockContent'
import HeroImage from '../../tempcomponents/shared/HeroImage'
import Lead from '../../tempcomponents/news/Lead'
import RelatedContent from '../../tempcomponents/news/RelatedContent'
import LatestNews from '../../tempcomponents/news/LatestNews'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import type { NewsCardData, NewsSchema } from '../../types/types'

const { publicRuntimeConfig } = getConfig()

const NewsLayout = styled.div`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 210px);

  /*  @TODO: Revisit when finalizing news article */
  & h2,
  & h3 {
    margin: var(--spacing-small) 0;
  }
`

const Header = styled.div`
  background: var(--slate-blue-95);
  padding: var(--banner-paddingVertical) var(--layout-paddingHorizontal-medium);
`

const HeaderInner = styled.div`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const StyledHeading = styled(Heading)`
  margin: 0;
`

const Date = styled.div`
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
  text-transform: uppercase;
  &:after {
    content: ':';
  }
  &:before {
    content: '|';
    margin-right: var(--space-small);
  }
`

const Image = styled.div`
  padding: 0 var(--layout-paddingHorizontal-small);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(var(--banner-paddingVertical) * -1);
  & > figure {
    margin: 0;
  }
`

const LeadParagraph = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  margin-top: var(--space-xLarge);
  margin-bottom: var(--space-3xLarge);

  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  /* Side effect of change yesterday :/ */
  & > p {
    margin-bottom: 0;
  }
`

const Content = styled.div`
  /* The max-width makes things easier with 50% floating images */
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  /** Remove the bottom margin of the last element inside the rich text editor/content
  Sanity add a div container for the rich text editor */
  > div > aside:last-child,
  > div > div:last-child {
    margin-bottom: 0;
    p:last-child {
      margin-bottom: 0;
    }
  }
  &:after {
    content: '.';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  /*   Clear floats if two left or right aligned images are adjacent siblings
 */
  .float-left + .float-left,
  .float-right + .float-right {
    clear: both;
  }
`

const Related = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: 1700px;
  margin: var(--space-4xLarge) auto;
`

const Latest = styled.div`
  padding: 0 var(--space-medium);
  margin: var(--space-4xLarge) auto;
  max-width: 1700px;
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
  const { pathname } = useRouter()

  const slug = data?.news?.slug
  const {
    data: { news, latestNews },
  } = usePreviewSubscription(newsQuery, {
    params: { slug },
    initialData: data,
    enabled: preview || router.query.preview !== null,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('[slug]', slug)
  return (
    <>
      <NextSeo
        title={news.documentTitle || news.title}
        description={news.metaDescription}
        openGraph={{
          title: news.title,
          description: news.metaDescription,
          type: 'article',
          article: {
            publishedTime: news.publishDateTime,
            modifiedTime: news.updatedAt,
          },
          url: fullUrl,
          images: getOpenGraphImages(news.openGraphImage || news.heroImage?.image),
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      ></NextSeo>
      <Layout preview={preview}>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article>
              <NewsLayout>
                <Header>
                  <HeaderInner>
                    <StyledHeading level="h1" size="2xl" inverted>
                      {news.title}
                    </StyledHeading>
                    <Date>
                      <Icon data={calendar} />
                      <DateContainer>
                        <FormattedDateTime datetime={news.publishDateTime} />
                        <LastModifiedLabel>Last modified</LastModifiedLabel>
                        <FormattedDateTime datetime={news.updatedAt} />
                      </DateContainer>
                    </Date>
                  </HeaderInner>
                </Header>
                <Image>{news.heroImage && <HeroImage data={news.heroImage} />}</Image>
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
    </>
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
