import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Heading, FormattedDateTime } from '@components'
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
import { Flags } from '../../common/helpers/datasetHelpers'
import type { NewsSchema } from '../../types/types'
import RichText from '../shared/portableText/RichText'

const NewsLayout = styled.div`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 210px);

  margin-bottom: var(--space-4xLarge);
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

const Content = styled.div`
  & h2,
  & h3 {
    margin: var(--space-small) 0;
  }
  ${Flags.IS_DEV && { padding: '0 var(--layout-paddingHorizontal-large)' }};

  /* The max-width makes things easier with 50% floating images */
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;

  /*   Clear floats if two left or right aligned images are adjacent siblings*/
  .float-left + .float-left,
  .float-right + .float-right {
    clear: both;
  }

  /* "Remove" margin top from FactBox if the following element is also a FactBox */
  .fact-box + .fact-box {
    margin-top: calc(-1 * var(--space-4xLarge));
  }
`

const Related = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: 1700px;
  margin: var(--space-4xLarge) auto;
`

const Latest = styled.div`
  padding: 0 var(--space-medium);
  margin: var(--space-4xLarge) auto 0;
  max-width: 1700px;
`

const StyledBasicIFrame = styled(BasicIFrame)`
  margin-top: var(--space-3xLarge);
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
          images: getOpenGraphImages((openGraphImage?.asset ? openGraphImage : null) || heroImage?.image),
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      ></NextSeo>
      <main>
        <article>
          <NewsLayout>
            <Header>
              <HeaderInner>
                <StyledHeading level="h1" size="2xl" inverted>
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
              <Content>
                {Flags.IS_DEV ? <RichText value={content}></RichText> : <NewsText value={content}></NewsText>}
              </Content>
            )}

            {iframe && <StyledBasicIFrame data={iframe} />}

            {relatedLinks?.links && relatedLinks.links.length > 0 && (
              <Related>
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
