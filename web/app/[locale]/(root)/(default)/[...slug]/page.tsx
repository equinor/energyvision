import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'
import { defaultLanguage, domain, metaTitleSuffix } from '@/languageConfig'
import { isDateAfter } from '@/lib/helpers/dateUtilities'
import getPageSlugs from '@/sanity/helpers/getPageSlugs'
import { getPageData } from '@/sanity/lib/fetchData'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { getLocaleFromName, getNameFromLocale } from '@/sanity/localization'
import { getQueryFromSlug } from '../../../../../sanity/helpers/queryFromSlug'

const MagazinePage = dynamic(() => import('@/templates/magazine/MagazinePage'))
const LandingPage = dynamic(() => import('@/templates/landingpage/LandingPage'))
const EventPage = dynamic(() => import('@/templates/event/Event'))
const NewsPage = dynamic(() => import('@/templates/news/News'))
const TopicPage = dynamic(() => import('@/templates/topic/TopicPage'))

type Props = {
  params: Promise<{ slug: string[]; locale: string }>
  searchParams: Promise<{ [key: string]: string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //array, separated by /. e.g. [news, last slug]
  const slug = (await params).slug
  const defaultLocale = defaultLanguage.locale
  const locale = (await params).locale ?? defaultLocale
  const fullSlug = `${domain}/${locale !== defaultLocale ? `${locale}/` : ''}${slug.join('/')}`

  console.log('generateMetadata [...slug], slug', slug)
  console.log('generateMetadata [...slug], locale', locale)
  const { query, queryParams } = await getQueryFromSlug(slug, locale)
  const { pageData } = await getPageData({
    query,
    queryParams,
  })

  if (!pageData) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[generateMetadata] pageData is null', { slug, locale })
    }
    return {
      title: metaTitleSuffix,
      openGraph: {
        title: metaTitleSuffix,
        url: fullSlug,
        locale,
        type: 'article',
        siteName: 'Equinor',
      },
      alternates: {
        ...(locale === defaultLocale && { canonical: fullSlug }),
        languages: {},
      },
    }
  }

  const slugs = getPageSlugs(pageData) ?? []

  const activeSlug =
    slugs.length > 0
      ? slugs.find(
          (slug: { lang: string; slug: string }) =>
            slug.lang === getNameFromLocale(locale),
        )?.slug
      : slug

  const canonicalSlug =
    locale === defaultLocale
      ? `${domain}${activeSlug !== '/' ? activeSlug : ''}`
      : `${domain}/${locale}${activeSlug !== '/' ? activeSlug : ''}`

  const alternateLinks: Record<string, string> = {}
  slugs.forEach((slug: { lang: string; slug: string }) => {
    const slugLocale = getLocaleFromName(slug.lang)
    const correctedSlug = (
      defaultLocale !== slugLocale ? `/${slugLocale}` : ''
    ).concat(slug.slug !== '/' ? slug.slug : '')
    Object.assign(alternateLinks, { [slugLocale]: `${domain}${correctedSlug}` })
  })

  //Fallback page if no locale
  const defaultSlug = slugs.find(
    (slug: { lang: string; slug: string }) =>
      slug.lang === defaultLanguage.name,
  )?.slug
  const xDefaultSlug = `${domain}${defaultSlug === '/' ? '' : defaultSlug}`

  //@ts-ignore: todo
  const {
    publishDateTime,
    updatedAt,
    documentTitle,
    title,
    metaDescription,
    openGraphImage,
    heroImage,
  } = pageData
  const plainTitle = Array.isArray(title) ? toPlainText(title) : title

  const modifiedDate = isDateAfter(publishDateTime, updatedAt)
    ? publishDateTime
    : updatedAt

  const ogImage = resolveOpenGraphImage(openGraphImage ?? heroImage?.image)

  return {
    title: `${documentTitle || plainTitle} - ${metaTitleSuffix}`,
    description: metaDescription,
    openGraph: {
      title: plainTitle,
      description: metaDescription,
      url: fullSlug,
      locale,
      type: 'article',
      siteName: 'Equinor',
      publishedTime: publishDateTime,
      modifiedTime: modifiedDate,
      images: ogImage,
    },
    alternates: {
      ...(locale === defaultLocale && { canonical: canonicalSlug }),
      languages: {
        ...alternateLinks,
        'x-default': xDefaultSlug,
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const s = (await params).slug
  const locale = (await params).locale
  const { query, queryParams } = await getQueryFromSlug(s as string[], locale)

  console.log("Fetching data for Topic Content Page")

  const { pageData } = await getPageData({
    query,
    queryParams,
  })
  if (!pageData) notFound()
  //console.log('[locale]>Page pageData', pageData)

  //const router = useRouter()

  const slug = pageData?.slug
  /*if (!router.isFallback && !slug && queryParams?.id) {
    return <ErrorPage pageData={pageData} />
  }*/

  const template = pageData?.template || null
  if (!template) console.warn('Missing template for', slug)

  /*if (router.isFallback) {
    return (
      <p>
        <FormattedMessage id="loading" defaultMessage="Loading..." />
      </p>
    )
  }*/

  const getTemplate = () => {
    switch (template) {
      case 'landingPage':
        return <LandingPage data={pageData} />
      case 'event':
        return <EventPage data={pageData} />
      case 'news':
      case 'localNews':
        return <NewsPage data={pageData} />
      case 'magazine':
        return <MagazinePage data={pageData} />
      default:
        return <TopicPage data={pageData} />
    }
  }

  return getTemplate()
}
