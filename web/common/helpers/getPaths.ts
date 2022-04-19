import { getNameFromLocale } from '../../lib/localization'
import { sanityClient } from '../../lib/sanity.server'
import { groq } from 'next-sanity'

const getTopicRoutesForLocale = async (locale: string) => {
  const lang = getNameFromLocale(locale)
  const data: { slug: string; _updatedAt: string }[] = await sanityClient.fetch(
    groq`*[_type match "route_" + $lang + "*" && defined(slug.current) && !(_id in path("drafts.**"))][] {
      _updatedAt,
      "slug": slug.current,
    }`,
    {
      lang,
    },
  )
  return data
}

const getNewsOrLocalNewsForLocale = async (type: 'news' | 'localNews', locale: string) => {
  const groqType = "'" + type + "'"
  const lang = getNameFromLocale(locale)
  const data: { slug: string; _updatedAt: string }[] = await sanityClient.fetch(
    groq`*[_type match ${groqType} && _lang == $lang && defined(slug.current) && !(_id in path("drafts.**"))][] {
      _updatedAt,
      "slug": slug.current,
    }`,
    {
      lang,
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
