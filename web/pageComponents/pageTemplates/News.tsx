import { useRouter } from 'next/router'
import { NewsArticleJsonLd, NextSeo } from 'next-seo'
import { Heading, FormattedDateTime, BackgroundContainer } from '@components'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'
import NewsText from '../shared/portableText/NewsText'
import DefaulHeroImage from '../shared/Hero/DefaultHeroImage'
import IngressText from '../shared/portableText/IngressText'
import RelatedContent from '../shared/RelatedContent'
import LatestNews from '../news/LatestNews'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import BasicIFrame from '../shared/iframe/BasicIFrame'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { metaTitleSuffix } from '../../languages'
import type { NewsSchema } from '../../types/types'
import { toPlainText } from '@portabletext/react'

const NewsLayout = styled.div`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 210px);

  margin-bottom: var(--space-4xLarge);
`

const Header = styled(BackgroundContainer)`
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
  font-size: var(--typeScale-1);
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
  /*  @TODO: Revisit when finalizing news article */
  & h2,
  & h3 {
    margin: var(--space-small) 0;
  }

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

const Content = styled.div<{ reduceMargin: boolean }>`
  & h2,
  & h3 {
    margin: var(--space-small) 0;
  }

  /* The max-width makes things easier with 50% floating images */
  max-width: var(--maxViewportWidth);
  margin: ${(reduceMargin) => (reduceMargin ? '0 auto var(--space-3xLarge) auto' : '0 auto 0 auto')};

  /*   Clear floats if two left or right aligned images are adjacent siblings*/
  .float-left + .float-left,
  .float-right + .float-right {
    clear: both;
  }

  /* "Remove" margin top from FactBox if the following element is also a FactBox */

  .fact-box:not(.fact-box--none) + .fact-box--colored,
  .fact-box.fact-box--image + .fact-box.fact-box--colored {
    margin-top: calc(-1 * var(--space-3xLarge));
  }

  .fact-box:not(.fact-box--image).fact-box--bg-moss-green + .fact-box.fact-box--bg-moss-green,
  .fact-box:not(.fact-box--image).fact-box--bg-slate-blue + .fact-box.fact-box--bg-slate-blue,
  .fact-box:not(.fact-box--image).fact-box--bg-mist-blue + .fact-box.fact-box--bg-mist-blue,
  .fact-box:not(.fact-box--image).fact-box--bg-moss-green-light + .fact-box.fact-box--bg-moss-green-light,
  .fact-box:not(.fact-box--image).fact-box--bg-spruce-wood + .fact-box.fact-box--bg-spruce-wood,
  .fact-box:not(.fact-box--image).fact-box--bg-mid-blue + .fact-box.fact-box--bg-mid-blue,
  .fact-box:not(.fact-box--image).fact-box--bg-mid-green + .fact-box.fact-box--bg-mid-green,
  .fact-box:not(.fact-box--image).fact-box--bg-mid-orange + .fact-box.fact-box--bg-mid-orange,
  .fact-box:not(.fact-box--image).fact-box--bg-mid-yellow + .fact-box.fact-box--bg-mid-yellow {
    margin-top: calc(-2 * var(--space-3xLarge));
  }
`

const Related = styled.div<{ reduceMargin: boolean }>`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: 1700px;
  margin: ${(reduceMargin) => (reduceMargin ? '0 auto var(--space-3xLarge) auto' : 'var(--space-3xLarge) auto')};
`

const Latest = styled.div`
  padding: 0 var(--space-medium);
  margin: var(--space-3xLarge) auto;
  max-width: 1700px;
`

const isDateAfter = (a: string, b: string) => {
  const dtA = new Date(a).getTime()
  const dtB = new Date(b).getTime()

  return dtA > dtB
}

type ArticleProps = {
  data: NewsSchema
}

const NewsPage = ({ data: news }: ArticleProps) => {
  const router = useRouter()
  /*  const appInsights = useAppInsightsContext() */
  const slug = news?.slug

  const { pathname, locale } = router

  const fullUrl = getFullUrl(pathname, slug, locale)

  const {
    publishDateTime,
    updatedAt,
    documentTitle,
    title,
    metaDescription,
    openGraphImage,
    heroImage,
    ingress,
    content,
    iframe,
    relatedLinks,
    latestNews,
  } = news

  const modifiedDate = isDateAfter(publishDateTime, updatedAt) ? publishDateTime : updatedAt

  const openGraphImages = getOpenGraphImages((openGraphImage?.asset ? openGraphImage : null) || heroImage?.image)
  /*   appInsights.trackPageView({ name: slug, uri: fullUrl }) */
  return (
    <>
      <NextSeo
        title={`${documentTitle || title} - ${metaTitleSuffix}`}
        description={metaDescription}
        openGraph={{
          title: title,
          description: metaDescription,
          type: 'article',
          article: {
            publishedTime: publishDateTime,
            modifiedTime: modifiedDate,
          },
          url: fullUrl,
          images: openGraphImages,
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      ></NextSeo>
      <NewsArticleJsonLd
        url={fullUrl}
        title={title}
        images={openGraphImages.map((it) => it.url)}
        dateCreated={publishDateTime}
        datePublished={publishDateTime}
        dateModified={modifiedDate}
        section=""
        keywords=""
        authorName=""
        publisherName="Equinor"
        publisherLogo="https://cdn.eds.equinor.com/logo/equinor-logo-horizontal.svg#red"
        description={toPlainText(ingress)}
        body={toPlainText(content)}
      />
      <main>
        <article>
          <NewsLayout>
            <Header background={'Slate Blue 95'}>
              <HeaderInner>
                <StyledHeading level="h1" size="3xl">
                  {title}
                </StyledHeading>
                {publishDateTime && (
                  <DateWrapper>
                    <Icon data={calendar} />
                    <DateContainer>
                      <FormattedDateTime uppercase datetime={publishDateTime} timezone />
                      {
                        // publishDateTime + 5 minutes
                        isDateAfter(
                          modifiedDate,
                          new Date(new Date(publishDateTime).getTime() + 5 * 60000).toISOString(),
                        ) && (
                          <>
                            <LastModifiedLabel>Last modified</LastModifiedLabel>
                            <FormattedDateTime uppercase datetime={modifiedDate} />
                          </>
                        )
                      }
                    </DateContainer>
                  </DateWrapper>
                )}
              </HeaderInner>
            </Header>
            <Image>{heroImage && <DefaulHeroImage data={heroImage} />}</Image>
            {ingress && ingress.length > 0 && (
              <LeadParagraph>
                <IngressText value={ingress} />
              </LeadParagraph>
            )}

            {content && content.length > 0 && (
              <Content reduceMargin={!!iframe.title}>
                <NewsText value={content}></NewsText>
              </Content>
            )}

            {iframe && <BasicIFrame data={iframe} />}

            {relatedLinks?.links && relatedLinks.links.length > 0 && (
              <Related reduceMargin={!!iframe.title}>
                <RelatedContent data={relatedLinks} />
              </Related>
            )}

            {latestNews && latestNews.length > 0 && (
              <Latest>
                <LatestNews data={latestNews} />
              </Latest>
            )}
          </NewsLayout>
        </article>
      </main>
    </>
  )
}

export default NewsPage
