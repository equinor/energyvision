import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import ErrorPage from 'next/error'
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { GetStaticProps, GetStaticPaths } from 'next'
import getConfig from 'next/config'
import { NextSeo } from 'next-seo'
import { Layout, Heading, FormattedDateTime } from '@components'
import styled from 'styled-components'
import { newsQuery, newsSlugsQuery, queryLocalizedNewsById } from '../../lib/queries/news'
import { usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import NewsBlockContent from '../../common/NewsBlockContent'
import HeroImage from '../../pageComponents/shared/HeroImage'
import Lead from '../../pageComponents/news/Lead'
import RelatedContent from '../../pageComponents/news/RelatedContent'
import LatestNews from '../../pageComponents/news/LatestNews'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import type { NewsCardData, NewsSchema } from '../../types/types'
import { Menu } from '../../pageComponents/shared/menu/Menu'
import { mapLocaleToLang } from '../../lib/localization'

const { publicRuntimeConfig } = getConfig()

const NewsLayout = styled.div`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 210px);

  /*  @TODO: Revisit when finalizing news article */
  & h2,
  & h3 {
    margin: var(--space-small) 0;
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

const DateWrapper = styled.div`
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

const isDateAfter = (a: string, b: string) => {
  const dtA = new Date(a).getTime()
  const dtB = new Date(b).getTime()

  return dtA > dtB
}

type ArticleProps = {
  data: {
    news: NewsSchema
    latestNews: NewsCardData[]
    slugs: {
      en_GB: string
      nb_NO: string
    }
  }
  preview: boolean
}

export default function News({ data, preview }: ArticleProps): JSX.Element {
  const router = useRouter()
  const appInsights = useAppInsightsContext()
  const slug = data?.news?.slug
  /** TODO: Find out why the first time News is called it is without data */
  if (!data) {
    return <ErrorPage statusCode={418} />
  }

  // @TODO: Since data can be undefined, the rules of hooks fails. Why is data undefined
  const {
    data: { news, latestNews },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = usePreviewSubscription(newsQuery, {
    params: { slug },
    initialData: data,
    enabled: preview || router.query.preview !== null,
  })

  const { pathname } = router

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('[slug]', slug)

  const modifiedDate = isDateAfter(news.publishDateTime, news.updatedAt) ? news.publishDateTime : news.updatedAt

  appInsights.trackPageView({ name: slug, uri: fullUrl })

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
            modifiedTime: modifiedDate,
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
                  <DateWrapper>
                    <Icon data={calendar} />
                    <DateContainer>
                      <FormattedDateTime datetime={news.publishDateTime} />
                      {isDateAfter(modifiedDate, news.publishDateTime) && (
                        <>
                          <LastModifiedLabel>Last modified</LastModifiedLabel>
                          <FormattedDateTime datetime={modifiedDate} />
                        </>
                      )}
                    </DateContainer>
                  </DateWrapper>
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
    </>
  )
}

// eslint-disable-next-line react/display-name
News.getLayout = (page: AppProps) => {
  // This is just an ordinary function

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page

  const { preview, data } = props

  // @TODO: Fix slugs for news
  const slugs = data?.slugs

  return (
    <Layout preview={preview}>
      <Menu slugs={slugs} />
      {page}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale = 'en' }) => {
  const { news, latestNews } = await getClient(preview).fetch(newsQuery, {
    slug: params?.slug,
    lang: mapLocaleToLang(locale),
  })

  const allSlugs = await getLocalizedNewsSlugs(news, preview)

  return {
    props: {
      preview,
      data: {
        news,
        latestNews,
        slugs: allSlugs,
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

const getLocalizedNewsSlugs = async (record: any, preview: boolean) => {
  if (!record || !record.id) return null

  // @TODO: why does the 'match' filter in groq not work here?
  // "&& _id match $id" where $id = the base id without __i18n
  const id = record.id.replace('drafts.', '').substr(0, 36)
  const slugs = await getClient(preview).fetch(queryLocalizedNewsById, {
    id_en: id,
    id_no: `${id}__i18n_nb_NO`,
  })

  if (!slugs) return null

  return slugs.reduce((obj: { [key: string]: string }, item: { lang: string; slug: string }) => {
    obj[item.lang] = item.slug
    return obj
  }, {})
}
