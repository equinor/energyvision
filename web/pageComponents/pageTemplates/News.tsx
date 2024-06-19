import { useRouter } from 'next/router'
import { NewsArticleJsonLd, NextSeo } from 'next-seo'
import { Heading, FormattedDateTime, BackgroundContainer } from '@components'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'
import DefaulHeroImage from '../shared/Hero/DefaultHeroImage'
import IngressText from '../shared/portableText/IngressText'
import LatestNews from '../news/LatestNews'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import BasicIFrame from '../shared/iframe/BasicIFrame'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { metaTitleSuffix } from '../../languages'
import type { NewsSchema } from '../../types/types'
import { toPlainText } from '@portabletext/react'
import Blocks from '../shared/portableText/Blocks'
import { twMerge } from 'tailwind-merge'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import Footnotes from '../../pageComponents/shared/portableText/components/Footnotes'

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
            <Header background={{ backgroundColor: 'Slate Blue 95' }}>
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
                <IngressText value={ingress} includeFootnotes />
              </LeadParagraph>
            )}

            {content && content.length > 0 && (
              <Blocks
                value={content}
                proseClassName="prose-article"
                className="p-0 max-w-viewport mx-auto"
                includeFootnotes
              />
            )}
            <div className="mt-8 mb-2 px-layout-lg max-w-viewport mx-auto">
              <Footnotes blocks={[...ingress, ...content]} />
            </div>

            {iframe && <BasicIFrame data={iframe} />}

            {relatedLinks?.links && relatedLinks.links.length > 0 && (
              <RelatedContent
                data={relatedLinks}
                className={twMerge(`
             px-layout-lg
             max-w-viewport
             my-3xl
             mx-auto
             `)}
              />
            )}

            {latestNews && latestNews.length > 0 && <LatestNews data={latestNews} />}
          </NewsLayout>
        </article>
      </main>
    </>
  )
}

export default NewsPage
