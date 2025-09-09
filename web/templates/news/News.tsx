'use client'
import { usePathname } from 'next/navigation'
import { NewsArticleJsonLd } from 'next-seo'
import { Typography } from '@/core/Typography'
import { FormattedDateTime } from '@/core/FormattedDateTime'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'
import IngressText from '../../portableText/IngressText'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import type { NewsSchema } from '../../types/index'
import { toPlainText } from '@portabletext/react'
import Blocks from '../../portableText/Blocks'
import { twMerge } from 'tailwind-merge'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import Footnotes from '../../portableText/components/Footnotes'
import { useLocale } from 'next-intl'
import { IFrame } from '@/core/IFrame/IFrame'
import { isDateAfter } from '@/common/helpers/dateUtilities'
import DefaulHeroImage from '@/sections/Hero/DefaultHeroImage'
import LatestNews from '@/pageComponents/news/LatestNews'
import { getFullUrl } from '@/common/helpers/getFullUrl'

type ArticleProps = {
  data: NewsSchema
}

const NewsPage = ({ data: news }: ArticleProps) => {
  console.log('NEWSPAGE', news)
  const slug = news?.slug

  const pathname = usePathname()
  const locale = useLocale()

  const fullUrl = getFullUrl(pathname, slug, locale)

  const {
    publishDateTime,
    updatedAt,
    title,
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

  const formattedContent = content.map((block) => ({
    ...block,
    markDefs: block.markDefs || [],
  }))

  return (
    <>
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
          <div className={'dark bg-slate-blue-95 px-layout-md py-news-banner-vertical'}>
            <div className="mx-auto max-w-[1186px]">
              <Typography id="mainTitle" variant="3xl" as="h1" className="m-0">
                {title}
              </Typography>
              {publishDateTime && (
                <div className="my-12 grid grid-cols-[min-content_1fr] gap-4">
                  <Icon data={calendar} className="text-white-100" />
                  <div className="text-base leading-planetary wrap-break-word text-white-100">
                    <FormattedDateTime uppercase datetime={publishDateTime} />
                    {
                      // publishDateTime + 5 minutes
                      isDateAfter(
                        modifiedDate,
                        new Date(new Date(publishDateTime).getTime() + 5 * 60000).toISOString(),
                      ) && (
                        <>
                          <span className='mx-4 my-0 uppercase before:mr-4 before:content-["|"] after:content-[":"]'>
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
            <div className="mx-auto -mt-news-banner-vertical max-w-viewport px-layout-sm py-0">
              <DefaulHeroImage className="m-0" data={heroImage} />
            </div>
          )}
          {ingress && ingress.length > 0 && (
            <div className="mx-auto mt-10 mb-16 max-w-viewport px-layout-lg py-0">
              <IngressText value={ingress} includeFootnotes />
            </div>
          )}

          {content && content.length > 0 && (
            <Blocks value={formattedContent} variant="prose-article" includeFootnotes />
          )}
          <div className="mx-auto mt-8 mb-2 max-w-viewport px-layout-lg">
            <Footnotes blocks={[...ingress, ...content]} />
          </div>

          {iframe && (
            <section className="mx-auto max-w-viewport px-layout-lg">
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
            <RelatedContent data={relatedLinks} className={twMerge(`my-3xl mx-auto max-w-viewport px-layout-lg`)} />
          )}
          {latestNews && latestNews.length > 0 && <LatestNews data={latestNews} />}
        </article>
      </main>
    </>
  )
}

export default NewsPage
