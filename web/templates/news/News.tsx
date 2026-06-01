import { calendar } from '@equinor/eds-icons'
import { toPlainText } from '@portabletext/react'
import { isAfter } from 'date-fns'
import dynamic from 'next/dynamic'
import { getLocale, getTranslations } from 'next-intl/server'
import type { PortableTextBlock } from 'next-sanity'
import { ArticleJsonLd } from 'next-seo'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import type { Figure, Image } from '@/core/Image/imageUtilities'
import TransformableIcon from '@/icons/TransformableIcon'
import { getFullUrl } from '@/lib/helpers/getFullUrl'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { DefaultHero } from '@/sections/Hero/DefaultHero'
import LatestNews from '@/sections/LatestNews/LatestNews'
import type { CardData, IFrameData, RelatedLinksData } from '@/types'
import Blocks from '../../portableText/Blocks'
import Footnotes from '../../portableText/components/Footnotes'
import RelatedContent from '../../sections/RelatedContent/RelatedContent'

export type NewsPageProps = {
  slug: string
  title: string
  documentTitle?: string
  metaDescription?: string
  openGraphImage?: Image
  id: string
  updatedAt: string
  publishDateTime: string
  heroImage: Figure
  ingress: PortableTextBlock[]
  content: PortableTextBlock[]
  relatedLinks: RelatedLinksData
  iframe: IFrameData
  latestNews: CardData[]
}

const NewsPage = async ({
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
  slug,
}: NewsPageProps) => {
  const locale = await getLocale()
  const intl = await getTranslations()

  const fullUrl = getFullUrl(slug ?? '', locale)

  //Is publishDateTime after updatedAt, then set modifiedDate to publishDateTime, else set to updatedAt
  const modifiedDate = isAfter(new Date(publishDateTime), new Date(updatedAt))
    ? publishDateTime
    : updatedAt

  const showModifiedDate = isAfter(
    new Date(modifiedDate),
    // publishDateTime + 5 minutes
    new Date(new Date(publishDateTime).getTime() + 5 * 60000),
  )
  const ogImage = resolveOpenGraphImage(openGraphImage ?? heroImage?.image)

  const formattedContent = content.map(block => ({
    ...block,
    markDefs: block.markDefs || [],
  }))
  const IFrame = dynamic(() => import('@/core/IFrame/IFrame'))

  const publishedInformation = (
    <div className='grid grid-cols-[min-content_1fr] items-start gap-2 text-base lg:flex lg:items-center lg:pb-12 dark:text-white-100'>
      <TransformableIcon iconData={calendar} className='md:-mt-1' />
      <div className='flex flex-col items-start gap-2 lg:flex-row lg:items-center'>
        <FormattedDateTime datetime={publishDateTime} />
        <div className='flex lg:items-center'>
          {showModifiedDate && (
            <>
              <div className='mr-2 hidden lg:flex'>|</div>
              {intl('last_modified') ?? 'Last modified'}
              <span className='w-1' />
              <FormattedDateTime datetime={modifiedDate} showTimezone={false} />
            </>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <main className='mx-auto flex w-full max-w-fullwidth'>
        <article className='w-full flex-col items-center pb-28'>
          <DefaultHero
            figure={heroImage}
            background='bg-slate-blue-95'
            className='dark'
            //@ts-ignore
            title={title}
            ratio='21:9'
            subTitle={publishedInformation}
            figCaptionClassName='light'
          />
          <div className='mx-auto max-w-content'>
            {ingress && ingress.length > 0 && (
              <Blocks
                group='article'
                variant='ingress'
                value={ingress}
                includeFootnotes
                className='my-6'
              />
            )}
            {content && content.length > 0 && (
              <Blocks
                group='article'
                variant='body'
                value={formattedContent}
                includeFootnotes
              />
            )}
            <div className='w-full px-layout-sm lg:px-layout-lg'>
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
          </div>
        </article>
      </main>
      <ArticleJsonLd
        url={fullUrl}
        type='NewsArticle'
        headline={title}
        image={[ogImage?.url ?? '']}
        datePublished={publishDateTime}
        dateModified={modifiedDate}
        publisher={{
          '@type': 'Organization',
          name: 'Equinor',
          logo: 'https://cdn.eds.equinor.com/logo/equinor-logo-horizontal.svg#red',
        }}
        description={toPlainText(ingress)}
      />
    </>
  )
}

export default NewsPage
