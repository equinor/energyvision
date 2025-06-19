import { useRouter } from 'next/router'
import { NewsArticleJsonLd, NextSeo } from 'next-seo'
import { Typography } from '@core/Typography'
import { FormattedDateTime } from '@core/FormattedDateTime'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'
import IngressText from '../shared/portableText/IngressText'
import LatestNews from '../news/LatestNews'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { metaTitleSuffix } from '../../languages'
import type { NewsSchema } from '../../types/index'
import { toPlainText } from '@portabletext/react'
import Blocks from '../shared/portableText/Blocks'
import { twMerge } from 'tailwind-merge'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import Footnotes from '../../pageComponents/shared/portableText/components/Footnotes'
import { IFrame } from '@core/IFrame/IFrame'
import DefaulHeroImage from '@sections/Hero/DefaultHeroImage'

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

  const formattedContent = content.map((block) => ({
    ...block,
    markDefs: block.markDefs || [],
  }))

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
        <article className="pb-28">
          <div className={'bg-slate-blue-95 py-news-banner-vertical px-layout-md dark'}>
            <div className="max-w-[1186px] mx-auto">
              <Typography id="mainTitle" variant="3xl" as="h1" className="m-0">
                {title}
              </Typography>
              {publishDateTime && (
                <div className="my-12 grid grid-cols-[min-content_1fr] gap-4 ">
                  <Icon data={calendar} className="text-white-100" />
                  <div className="text-white-100 overflow-wrap-break-word text-base leading-planetary">
                    <FormattedDateTime uppercase datetime={publishDateTime} timezone />
                    {
                      // publishDateTime + 5 minutes
                      isDateAfter(
                        modifiedDate,
                        new Date(new Date(publishDateTime).getTime() + 5 * 60000).toISOString(),
                      ) && (
                        <>
                          <span className='uppercase my-0 mx-4 after:content-[":"] before:content-["|"] before:mr-4  '>
                            Last modified
                          </span>
                          <FormattedDateTime uppercase datetime={modifiedDate} />
                        </>
                      )
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
          {heroImage.image.asset && (
            <div className="py-0 px-layout-sm max-w-viewport mx-auto -mt-news-banner-vertical">
              <DefaulHeroImage className="m-0" data={heroImage} />
            </div>
          )}
          {ingress && ingress.length > 0 && (
            <div className="py-0 px-layout-lg mt-10 mb-16 max-w-viewport mx-auto">
              <IngressText value={ingress} includeFootnotes />
            </div>
          )}

          {content && content.length > 0 && (
            <Blocks
              value={formattedContent}
              proseClassName="prose-article"
              className="p-0 max-w-viewport mx-auto"
              includeFootnotes
            />
          )}
          <div className="mt-8 mb-2 px-layout-lg max-w-viewport mx-auto">
            <Footnotes blocks={[...ingress, ...content]} />
          </div>

          {iframe && (
            <section className="px-layout-lg max-w-viewport mx-auto">
              <IFrame
                //@ts-ignore:TODO type match for portabletext
                title={iframe?.title}
                showTitleAbove={true}
                frameTitle={iframe?.frameTitle}
                url={iframe?.url}
                cookiePolicy={iframe?.cookiePolicy}
                aspectRatio={iframe?.designOptions?.aspectRatio}
                description={iframe?.description}
              />
            </section>
          )}

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
        </article>
      </main>
    </>
  )
}

export default NewsPage
