'use client'
import { calendar } from '@equinor/eds-icons'
import { toPlainText } from '@portabletext/react'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { NewsArticleJsonLd } from 'next-seo'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { IFrame } from '@/core/IFrame/IFrame'
import TransformableIcon from '@/icons/TransformableIcon'
import { isDateAfter } from '@/lib/helpers/dateUtilities'
import { getFullUrl } from '@/lib/helpers/getFullUrl'
import LatestNews from '@/pageComponents/news/LatestNews'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { DefaultHero } from '@/sections/Hero/DefaultHero'
import { colorKeyToUtilityMap } from '@/styles/colorKeyToUtilityMap'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import Blocks from '../../portableText/Blocks'
import Footnotes from '../../portableText/components/Footnotes'
import type { NewsSchema } from '../../types/index'

type ArticleProps = {
  data: NewsSchema
}

const NewsPage = ({ data: news }: ArticleProps) => {
  const slug = news?.slug

  const pathname = usePathname()
  const locale = useLocale()
  const intl = useTranslations()

  const fullUrl = getFullUrl(pathname ?? '', slug ?? '', locale)

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

  const modifiedDate = isDateAfter(publishDateTime, updatedAt)
    ? publishDateTime
    : updatedAt
  const ogImage = resolveOpenGraphImage(openGraphImage ?? heroImage?.image)

  console.log('heroImage', heroImage)

  const formattedContent = content.map(block => ({
    ...block,
    markDefs: block.markDefs || [],
  }))

  const publishedInformation = (
    <div className='flex items-center gap-2 px-layout-md pb-12 text-base dark:text-white-100'>
      <TransformableIcon iconData={calendar} className='-mt-1' />
      <FormattedDateTime datetime={publishDateTime} />
      {
        // publishDateTime + 5 minutes
        isDateAfter(
          modifiedDate,
          new Date(
            new Date(publishDateTime).getTime() + 5 * 60000,
          ).toISOString(),
        ) && (
          <>
            <span>|</span>
            {intl('last_modified') ?? 'Last modified'}
            {` `}
            <FormattedDateTime datetime={modifiedDate} />
          </>
        )
      }
    </div>
  )

  return (
    <>
      <NewsArticleJsonLd
        url={fullUrl}
        title={title}
        images={[ogImage?.url ?? '']}
        dateCreated={publishDateTime}
        datePublished={publishDateTime}
        dateModified={modifiedDate}
        section=''
        keywords=''
        authorName=''
        publisherName='Equinor'
        publisherLogo='https://cdn.eds.equinor.com/logo/equinor-logo-horizontal.svg#red'
        description={toPlainText(ingress)}
        body={toPlainText(content)}
      />
      <main className='[:not(:has(.sticky-menu))]:pt-topbar'>
        <article className='flex flex-col items-center pb-28'>
          <DefaultHero
            figure={heroImage}
            background={colorKeyToUtilityMap['slate-blue-95'].background}
            className='dark'
            title={title}
            subTitle={publishedInformation}
            imageWrapperClassName='light'
            figCaptionClassName='px-layout-lg'
          />
          {/*           <div className={'dark w-full bg-slate-blue-95'}>
            <div className='px-layout-lg py-news-banner-vertical'>
              <Typography id='mainTitle' variant='h1'>
                {title}
              </Typography>
              {publishDateTime && (
                <div className='my-12 grid grid-cols-[min-content_1fr] gap-4'>
                  <Icon data={calendar} className='text-white-100' />
                  <div className='wrap-break-word text-base text-white-100 leading-planetary'>
                    <FormattedDateTime uppercase datetime={publishDateTime} />
                    {
                      // publishDateTime + 5 minutes
                      isDateAfter(
                        modifiedDate,
                        new Date(
                          new Date(publishDateTime).getTime() + 5 * 60000,
                        ).toISOString(),
                      ) && (
                        <>
                          <span className='mx-4 my-0 uppercase before:mr-4 before:content-["|"] after:content-[":"]'>
                            Last modified
                          </span>
                          <FormattedDateTime
                            uppercase
                            datetime={modifiedDate}
                          />
                        </>
                      )
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
          {heroImage.image.asset && (
            <div className='-mt-news-banner-vertical px-layout-sm'>
              <DefaultHero image={heroImage} />
            </div>
          )} */}

          {ingress && ingress.length > 0 && (
            <Blocks
              variant='ingress'
              value={ingress}
              includeFootnotes
              blockClassName='px-layout-lg'
            />
          )}
          {content && content.length > 0 && (
            <Blocks group='article' value={formattedContent} includeFootnotes />
          )}
          <div className='px-layout-lg'>
            <div className='mt-8 mb-2'>
              <Footnotes blocks={[...ingress, ...content]} />
            </div>

            {iframe && (
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
            )}

            {relatedLinks?.links && relatedLinks.links.length > 0 && (
              <RelatedContent data={relatedLinks} className={`my-3xl`} />
            )}
          </div>
          {latestNews && latestNews.length > 0 && (
            <LatestNews data={latestNews} />
          )}
        </article>
      </main>
    </>
  )
}

export default NewsPage
