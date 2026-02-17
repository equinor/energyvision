import { calendar } from '@equinor/eds-icons'
import { toPlainText } from '@portabletext/react'
import { getLocale, getTranslations } from 'next-intl/server'
import type { PortableTextBlock } from 'next-sanity'
import { ArticleJsonLd } from 'next-seo'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { IFrame } from '@/core/IFrame/IFrame'
import TransformableIcon from '@/icons/TransformableIcon'
import { isDateAfter } from '@/lib/helpers/dateUtilities'
import { getFullUrl } from '@/lib/helpers/getFullUrl'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { DefaultHero } from '@/sections/Hero/DefaultHero'
import LatestNews from '@/sections/LatestNews/LatestNews'
import type {
  CardData,
  IFrameData,
  ImageWithAlt,
  ImageWithCaptionData,
  RelatedLinksData,
} from '@/types'
import Blocks from '../../portableText/Blocks'
import Footnotes from '../../portableText/components/Footnotes'
import RelatedContent from '../../sections/RelatedContent/RelatedContent'

export type NewsPageProps = {
  slug: string
  title: string
  documentTitle?: string
  metaDescription?: string
  openGraphImage?: ImageWithAlt
  id: string
  updatedAt: string
  publishDateTime: string
  heroImage: ImageWithCaptionData
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

  const modifiedDate = isDateAfter(publishDateTime, updatedAt)
    ? publishDateTime
    : updatedAt
  const ogImage = resolveOpenGraphImage(openGraphImage ?? heroImage?.image)

  const formattedContent = content.map(block => ({
    ...block,
    markDefs: block.markDefs || [],
  }))

  const publishedInformation = (
    <div className='grid grid-cols-[min-content_1fr] items-start gap-2 pb-12 text-base lg:flex lg:items-center dark:text-white-100'>
      <TransformableIcon iconData={calendar} className='md:-mt-1' />
      <div className='flex flex-col items-start gap-2 lg:flex-row lg:items-center'>
        <FormattedDateTime datetime={publishDateTime} />
        <div className='flex lg:items-center'>
          {
            // publishDateTime + 5 minutes
            isDateAfter(
              modifiedDate,
              new Date(
                new Date(publishDateTime).getTime() + 5 * 60000,
              ).toISOString(),
            ) && (
              <>
                <div className='mr-2 hidden lg:flex'>|</div>
                {intl('last_modified') ?? 'Last modified'}
                <span className='w-1' />
                <FormattedDateTime datetime={modifiedDate} />
              </>
            )
          }
        </div>
      </div>
    </div>
  )

  return (
    <>
      <main className='pt-topbar'>
        <article className='flex flex-col items-center pb-28'>
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
            <Blocks group='article' value={formattedContent} includeFootnotes />
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
