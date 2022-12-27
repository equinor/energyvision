import { groq } from 'next-sanity'
import { getNameFromLocale } from '../../lib/localization'
import { publishDateTimeQuery } from '../../lib/queries/common/publishDateTime'
import { sanityClient } from '../../lib/sanity.server'
import { noDrafts, sameLang } from './../../lib/queries/common/langAndDrafts'

// These URLs uses SSR and thus should not be static rendered
const topicSlugBlackList = {
  en_GB: ['/news'],
  nb_NO: ['/nyheter'],
}

const getTopicRoutesForLocale = async (locale: string) => {
  const lang = getNameFromLocale(locale)
  // Empty array as fallback for satelittes
  const blacklist = topicSlugBlackList[lang as keyof typeof topicSlugBlackList] || []
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

const getDocumentsForLocale = async (type: 'news' | 'localNews' | 'magazine', locale: string) => {
  const lang = getNameFromLocale(locale)
  const data: { slug: string; _updatedAt: string }[] = await sanityClient.fetch(
    groq`*[_type == $type && defined(slug.current) && ${sameLang} && ${noDrafts}][] {
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
  const draft = isPreview ? `` : /* groq */ `&& ${noDrafts}`
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
    const pages = await getDocumentsForLocale('news', locale)
    return pages.map((page) => ({
      slug: page.slug.split('/').filter((p) => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}

export const getMagazinePaths = async (locales: string[]): Promise<PathType[]> => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getDocumentsForLocale('magazine', locale)
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
    const pages = await getDocumentsForLocale('localNews', locale)
    return pages.map((page) => ({
      slug: page.slug.split('/').filter((p) => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}

export const getNewsroomPaths = async (): Promise<PathType[]> => {
  // Use last published news as updatedAt field for newsroom
  const getUpdatedAt = async (lang: 'en_GB' | 'nb_NO'): Promise<{ _updatedAt: string }> =>
    await sanityClient.fetch(
      groq`*[_type == 'news' && ${sameLang} && ${noDrafts}] | order(${publishDateTimeQuery} desc)[0] {
      _updatedAt,
    }`,
      {
        lang,
      },
    )

  const { _updatedAt: englishUpdatedAt } = await getUpdatedAt('en_GB')
  const { _updatedAt: norwegianUpdatedAt } = await getUpdatedAt('nb_NO')

  return [
    {
      slug: ['news'],
      updatedAt: englishUpdatedAt,
      locale: 'en',
    },
    {
      slug: ['nyheter'],
      updatedAt: norwegianUpdatedAt,
      locale: 'no',
    },
  ]
}

export const getMagazineIndexPaths = async (): Promise<PathType[]> => {
  // Use last published news as updatedAt field for newsroom
  const getUpdatedAt = async (lang: 'en_GB' | 'nb_NO'): Promise<{ _updatedAt: string }> =>
    await sanityClient.fetch(
      groq`*[_type == 'magazine' && ${sameLang} && ${noDrafts}] | order(_createdAt desc)[0] {
      _updatedAt,
    }`,
      {
        lang,
      },
    )

  const { _updatedAt: englishUpdatedAt } = await getUpdatedAt('en_GB')
  const { _updatedAt: norwegianUpdatedAt } = await getUpdatedAt('nb_NO')

  return [
    {
      slug: ['magazine'],
      updatedAt: englishUpdatedAt,
      locale: 'en',
    },
    {
      slug: ['magasin'],
      updatedAt: norwegianUpdatedAt,
      locale: 'no',
    },
  ]
}
