import { draftMode } from 'next/headers'
import { type QueryParams, toPlainText } from 'next-sanity'
import {
  defaultLanguage,
  domain,
  languages,
  metaTitleSuffix,
} from '@/languageConfig'
import {
  getIsoFromName,
  getLocaleFromIso,
  getLocaleFromName,
  getNameFromIso,
} from '@/sanity/helpers/localization'
import { getQueryFromSlug } from '@/sanity/helpers/queryFromSlug'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { isDateAfter } from '../../lib/helpers/dateUtilities'
import { routeSanityFetch } from '../lib/live'
import { contentQueryById, pageInfoById } from '../queries/contentById'
import {
  allMagazineDocuments,
  getMagazineArticlesByTag,
} from '../queries/magazine'

export type LocaleSlug = { lang: string; slug: string }
/**
 * Return translated sanity slugs to iso lang and prefixed joined slug
 */
const formatToValidPrefixedIsoSlugs = (
  slug: string | string[],
  slugs: LocaleSlug[] = [],
) => {
  const validLanguages = languages.map(lang => lang.name)

  return (
    slugs
      ?.filter(e => e)
      .reduce(function (result: LocaleSlug[], metaSlug: LocaleSlug) {
        if (validLanguages.includes(metaSlug.lang)) {
          result.push({
            lang: getIsoFromName(metaSlug.lang),
            slug:
              metaSlug.lang !== 'en_GB'
                ? // metaSlug.slug !== '/' <- To skip the homepage slugs which are only /
                  `/${getLocaleFromName(metaSlug.lang)}${metaSlug.slug && metaSlug.slug !== '/' ? metaSlug.slug : ''}`
                : metaSlug.slug
                  ? metaSlug.slug
                  : '/',
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
  const canonicalSlug = `${domain}${getRelativeWithPrefixSlug(slug, locale)}`
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
    canonical: canonicalSlug,
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
    slugs: langSlugs,
  } = metaData

  const plainTitle = Array.isArray(title) ? toPlainText(title) : title
  const ogImage = resolveOpenGraphImage(openGraphImage ?? heroImage?.image)
  const slugs = formatToValidPrefixedIsoSlugs(slug, langSlugs)
  const alternates = generateAlternatesLinks(slug, locale, slugs)
  const modifiedDate = isDateAfter(publishDateTime, updatedAt)
    ? publishDateTime
    : updatedAt

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

type Params = {
  slug?: string | string[]
  locale: string
  tags?: string[]
  searchParams?: {
    [key: string]: string[] | string | undefined
  }
}

export async function getPage(params: Params) {
  const { slug, locale, tags = [], searchParams } = params
  const { tag } = searchParams || {}
  let pageData = null
  if (slug?.[0]?.includes('preview')) {
    const id = slug[1]
    if (id) {
      const { data: draftInfo } = await routeSanityFetch({
        query: pageInfoById,
        params: {
          id,
        },
      })

      if (draftInfo?.lang) {
        const { data } = await routeSanityFetch({
          query: contentQueryById,
          params: {
            id,
            lang: draftInfo?.lang,
          },
        })
        pageData = data
      }
    }
  } else {
    const { query: pageQuery, queryParams: pageQueryParams } =
      await getQueryFromSlug(slug, locale)

    const { data } = await routeSanityFetch({
      query: pageQuery,
      tags: [...tags],
      params: { ...pageQueryParams },
    })
    pageData = data
  }

  let magazineArticles = null
  if (pageData?.template === 'magazineIndex') {
    console.log('template is magazine room fetch magazine articles')
    const { data: articles } = await routeSanityFetch({
      query:
        tag && tag !== 'all'
          ? getMagazineArticlesByTag(false, false)
          : allMagazineDocuments,
      params: {
        lang: getNameFromIso(locale),
        ...(tag && tag !== 'all' && { tag }),
      } as QueryParams,
      tags: ['magazine'],
    })
    magazineArticles = articles
  }

  const { stickyMenu, slugs = [], ...restPageData } = pageData || {}

  return {
    headerData: {
      slugs: formatToValidPrefixedIsoSlugs(
        //@ts-ignore
        slug,
        slugs?.translationSlugs,
      ),
      stickyMenuData: stickyMenu,
    },
    pageData: {
      ...(pageData?.template === 'magazineIndex' && {
        magazineArticles,
      }),
      ...restPageData,
    },
  }
}
