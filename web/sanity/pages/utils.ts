import { toPlainText } from 'next-sanity'
import {
  defaultLanguage,
  domain,
  languages,
  metaTitleSuffix,
} from '@/languageConfig'
import { getQueryFromSlug } from '@/sanity/helpers/queryFromSlug'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import {
  getIsoFromName,
  getLocaleFromIso,
  getLocaleFromName,
  getNameFromIso,
} from '@/sanity/localization'
import { isDateAfter } from '../../lib/helpers/dateUtilities'

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
  console.log('constructSanityMetadata slug', slug)
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
  console.log('constructSanityMetadata metaSlugs', metaSlugs)
  const slugs = formatToValidPrefixedIsoSlugs(slug, metaSlugs?.translationSlugs)
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

type Params = { slug?: string | string[]; locale: string; tags?: string[] }

export async function getPage(params: Params) {
  const { slug, locale, tags = [] } = params
  console.log(`getPage slug - ${slug} -locale: ${locale}`)

  const { query: pageQuery, queryParams: pageQueryParams } =
    await getQueryFromSlug(slug, locale)

  const pageData = await sanityFetch({
    query: pageQuery,
    tags: [...tags],
    params: { ...pageQueryParams },
  })

  const { stickyMenu, slugs, ...restPageData } = pageData || {}

  const prefixedTranslationsSlugs = formatToValidPrefixedIsoSlugs(
    //@ts-ignore
    slug,
    slugs?.slugsFromTranslations,
  )
  console.log('Getpage prefixedTranslationsSlugs', prefixedTranslationsSlugs)

  return {
    headerData: {
      slugs: prefixedTranslationsSlugs,
      stickyMenu,
    },
    pageData: restPageData,
  }
}
