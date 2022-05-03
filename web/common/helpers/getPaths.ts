import { getNameFromLocale } from '../../lib/localization'
import { sanityClient } from '../../lib/sanity.server'
import { groq } from 'next-sanity'

// These URLs uses SSR and thus should not be static rendered
const topicSlugBlackList = {
  en_GB: ['/news'],
  nb_NO: ['/nyheter'],
}

const getTopicRoutesForLocale = async (locale: string) => {
  const lang = getNameFromLocale(locale)
  const blacklist = topicSlugBlackList[lang as keyof typeof topicSlugBlackList]
  const data: { slug: string; _updatedAt: string }[] = await sanityClient.fetch(
    groq`*[_type match "route_" + $lang + "*" && (!(slug.current in $blacklist)) && defined(slug.current) && !(_id in path("drafts.**"))][] {
      _updatedAt,
      "slug": slug.current,
    }`,
    {
      lang,
      blacklist,
    },
  )
  return data
}

const getNewsOrLocalNewsForLocale = async (type: 'news' | 'localNews', locale: string) => {
  const lang = getNameFromLocale(locale)
  const data: { slug: string; _updatedAt: string }[] = await sanityClient.fetch(
    groq`*[_type == $type && _lang == $lang && defined(slug.current)][] {
      _updatedAt,
      "slug": slug.current,
    }`,
    {
      type,
      lang,
    },
  )
  return data
}

// Get a Sanity document by given slug
// Only include drafts if preview mode is enabled
export const getDocumentBySlug = async (slug: string, isPreview = false) => {
  const draft = isPreview ? `` : `&& !(_id in path("drafts.**"))`
  const data: { slug: string; _updatedAt: string }[] = await sanityClient.fetch(
    groq`*[defined(slug.current) && slug.current == $slug ${draft}][0] {
      _updatedAt,
      "slug": slug.current,
    }`,
    {
      slug,
    },
  )
  return data
}

export type PathType = {
  slug: string[] | string
  updatedAt: string
  locale: string
}

export const getRoutePaths = async (locales: string[]): Promise<PathType[]> => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getTopicRoutesForLocale(locale)
    return pages.map((page) => ({
      slug: page.slug.split('/').filter((p) => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}

export const getNewsPaths = async (locales: string[]): Promise<PathType[]> => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getNewsOrLocalNewsForLocale('news', locale)
    return pages.map((page) => ({
      slug: page.slug.split('/').filter((p) => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}

export const getLocalNewsPaths = async (locales: string[]): Promise<PathType[]> => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getNewsOrLocalNewsForLocale('localNews', locale)
    return pages.map((page) => ({
      slug: page.slug.split('/').filter((p) => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}
