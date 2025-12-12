import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'
import {
  defaultLanguage,
  domain,
  languages,
  metaTitleSuffix,
} from '@/languageConfig'
import { isDateAfter } from '@/lib/helpers/dateUtilities'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { getQueryFromSlug } from '@/sanity/helpers/queryFromSlug'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import {
  getIsoFromName,
  getLocaleFromIso,
  getLocaleFromName,
  getNameFromIso,
  getNameFromLocale,
} from '@/sanity/localization'
import { pageMetaQuery } from '@/sanity/metaData'
import { footerQuery } from '@/sanity/queries/footer'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import Footer from '@/sections/Footer/Footer'
import Header from '@/sections/Header/Header'

const MagazinePage = dynamic(() => import('@/templates/magazine/MagazinePage'))
const LandingPage = dynamic(() => import('@/templates/landingpage/LandingPage'))
const EventPage = dynamic(() => import('@/templates/event/Event'))
const NewsPage = dynamic(() => import('@/templates/news/News'))
const TopicPage = dynamic(() => import('@/templates/topic/TopicPage'))

type Props = {
  params: Promise<{ slug: string[]; locale: string }>
  searchParams: Promise<{ [key: string]: string[] | undefined }>
}

export type LocaleSlug = { lang: string; slug: string }
/**
 * Return translated sanity slugs to iso lang and prefixed joined slug
 */
const formatToValidPrefixedIsoSlugs = (
  slug: string | string[],
  slugs: LocaleSlug[] = [],
) => {
  const validLanguages = languages.map(lang => lang.name)
  //Homepage
  if (typeof slug === 'undefined' || slug === '') {
    return slugs?.reduce(function (result: LocaleSlug[], metaSlug: LocaleSlug) {
      if (validLanguages.includes(metaSlug.lang)) {
        result.push({
          lang: getIsoFromName(metaSlug.lang),
          slug:
            metaSlug.lang !== 'en_GB'
              ? `/${getLocaleFromName(metaSlug.lang)}`
              : '/',
        })
      }
      return result
    }, [])
  }

  return (
    slugs?.reduce(function (result: LocaleSlug[], metaSlug: LocaleSlug) {
      if (validLanguages.includes(metaSlug.lang)) {
        result.push({
          lang: getIsoFromName(metaSlug.lang),
          slug:
            metaSlug.lang !== 'en_GB'
              ? `/${getLocaleFromName(metaSlug.lang)}/${metaSlug.slug}`
              : metaSlug.slug,
        })
      }
      return result
    }, []) ?? [Array.isArray(slug) ? slug.join('/') : (slug ?? '/')]
  )
}
const getRelativeWithPrefixSlug = (slug: string | string[], locale: string) => {
  const prefixLocale = getLocaleFromIso(locale)
  if (typeof slug === 'undefined' || slug === '') {
    return `/${locale !== defaultLanguage.iso ? prefixLocale : ''}`
  }

  // Catch all segment
  if (Array.isArray(slug)) {
    return `/${locale !== defaultLanguage.iso ? `${prefixLocale}/` : ''}${slug.join('/')}`
  }
  // next path folders
  return `/${locale !== defaultLanguage.iso ? `${prefixLocale}/` : ''}${slug}`
}

const generateAlternatesLinks = (
  // next slug string or string array
  slug: string | string[],
  //iso format
  locale: string,
  //translations slugs formatted to lang iso, prefixed slug
  slugs: LocaleSlug[],
) => {
  let activeSlug = getRelativeWithPrefixSlug(slug, locale)
  if (slugs && slugs.length > 0) {
    const activeTranslationSlug = slugs.find(
      translationSlug => translationSlug.lang === getNameFromIso(locale),
    )?.slug
    if (activeTranslationSlug) {
      activeSlug = activeTranslationSlug
    }
  }
  const canonicalSlug = `${domain}${activeSlug}`
  let xDefaultSlug = canonicalSlug

  const alternateLinks: Record<string, string> = {}
  slugs.forEach(translationSlug => {
    if (translationSlug.lang === defaultLanguage.iso) {
      xDefaultSlug = `${domain}${translationSlug.slug}`
    }

    Object.assign(alternateLinks, {
      [translationSlug.lang]: `${domain}${translationSlug.slug}`,
    })
  })

  return {
    ...(locale === defaultLanguage.iso && { canonical: canonicalSlug }),
    languages: {
      ...alternateLinks,
      'x-default': xDefaultSlug,
    },
  }
}

export const constructSanityMetadata = (
  slug: string | string[],
  locale: string,
  metaData: any,
) => {
  const relativeSlug = getRelativeWithPrefixSlug(slug, locale)
  const fullSlug = `${domain}${relativeSlug}`
  console.log('generateMetadata fullSlug', fullSlug)

  if (!metaData) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[generateMetadata] metaData is null', { slug, locale })
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
        ...(locale === defaultLanguage.iso && { canonical: fullSlug }),
        languages: {},
      },
    }
  }

  const {
    documentTitle,
    title,
    metaDescription,
    openGraphImage,
    heroImage,
    publishDateTime,
    updatedAt,
    slugs: metaSlugs,
  } = metaData

  const plainTitle = Array.isArray(title) ? toPlainText(title) : title
  const ogImage = resolveOpenGraphImage(openGraphImage ?? heroImage?.image)

  const slugs = formatToValidPrefixedIsoSlugs(slug, metaSlugs)
  console.log('generateMetadata slugs', slugs)
  const modifiedDate = isDateAfter(publishDateTime, updatedAt)
    ? publishDateTime
    : updatedAt
  const alternates = generateAlternatesLinks(slug, locale, slugs)

  console.log('generateMetadata alternates', alternates)

  return {
    title: `${documentTitle ?? plainTitle} - ${metaTitleSuffix}`,
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
      image: ogImage,
    },
    alternates,
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //array, separated by /. e.g. [news, last slug]
  const { slug, locale } = await params

  const metaData = await sanityFetch({
    query: pageMetaQuery,
    params: {
      lang: getNameFromLocale(locale),
      slug: `/${slug.join('/')}`,
    },
    stega: false,
  })

  return constructSanityMetadata(slug, locale, metaData)
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params
  const { headerData, pageData, footerData } = await getPage({ slug, locale })

  if (!pageData) notFound()

  const template = pageData?.template
  if (!template || typeof template === 'undefined')
    console.warn('Missing template for', pageData?.slug)

  const getTemplate = () => {
    switch (template) {
      case 'landingPage':
        return <LandingPage data={pageData} />
      case 'event':
        return <EventPage data={pageData} />
      case 'news':
      case 'localNews':
        return <NewsPage {...pageData} />
      case 'magazine':
        return <MagazinePage {...pageData} />
      default:
        return <TopicPage {...pageData} />
    }
  }

  return (
    <>
      <Header {...headerData} />
      {getTemplate()}
      <Footer {...footerData} />
    </>
  )
}

type Params = { slug?: string | string[]; locale: string }

export async function getPage(params: Params) {
  const { slug, locale } = params
  console.log(`getPage slug - ${slug} -locale: ${locale}`)

  const { query: pageQuery, queryParams: pageQueryParams } =
    await getQueryFromSlug(slug, locale)
  console.log('GetPage pageQueryParams', pageQueryParams)
  const [headerData, fullData, footerData] = await Promise.all([
    sanityFetch({
      query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
      params: { lang: pageQueryParams.lang },
      tags: ['siteMenu', 'subMenu'],
    }),
    sanityFetch({
      query: pageQuery,
      tags: [
        'homePage',
        'page',
        'event',
        'landingPage',
        'news',
        'localNews',
        'magazine',
        'newsroom',
        'magazineIndexPage',
      ],
      params: { ...pageQueryParams },
    }),
    sanityFetch({
      query: footerQuery,
      params: {
        lang: pageQueryParams.lang,
      },
    }),
  ])
  const { pageData } = fullData || {}
  const { stickyMenu, slugs, ...restPageData } = pageData || {}
  console.log('Home page slugs', slugs)
  //@ts-ignore
  const prefixedTranslationsSlugs = formatToValidPrefixedIsoSlugs(
    slug,
    slugs?.slugsFromTranslations,
  )

  return {
    headerData: {
      slugs: prefixedTranslationsSlugs,
      stickyMenu,
      menuData: headerData,
    },
    pageData: restPageData,
    footerData,
  }
}
