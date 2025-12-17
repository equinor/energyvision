import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { sanityFetch } from '../lib/live'
import { sameLang } from '../queries/common/langAndDrafts'
import { publishDateTimeQuery } from '../queries/common/publishDateTime'
import { getNameFromLocale } from './localization'

const getTopicRoutesForLocale = async (locale: string) => {
  const lang = getNameFromLocale(locale)

  const data: { slug: string; _updatedAt: string }[] = await client.fetch(
    groq`*[_type match "route_" + $lang && defined(slug.current)][] {
      _updatedAt,
      "slug": slug.current,
    }`,
    {
      lang,
    },
  )
  return data
}
const getTopicRoutesForLocaleToStaticallyBuild = async (locale: string) => {
  const lang = getNameFromLocale(locale)
  const data: { slug: string; _updatedAt: string }[] = await client.fetch(
    groq`*[_type match "route_" + $lang  && includeInBuild && defined(slug.current)][] {
      _updatedAt,
      "slug": slug.current,
    }`,
    {
      lang,
    },
  )
  return data
}

const getDocumentsForLocale = async (
  type: 'news' | 'localNews' | 'magazine',
  locale: string,
) => {
  const lang = getNameFromLocale(locale)
  const data: { slug: string; _updatedAt: string }[] = await client.fetch(
    groq`*[_type == $type && defined(slug.current) && ${sameLang} ][] {
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
export const getDocumentBySlug = async (slug: string) => {
  const { data } = await sanityFetch({
    query: `*[defined(slug.current) && slug.current == $slug][0] {
      _updatedAt,
      "slug": slug.current,
    }`,
    params: { slug },
  })
  return data
}

export type PathType = {
  slug: string[] | string
  updatedAt: string
  locale: string
}

export const getStaticBuildRoutePaths = async (
  locales: string[],
): Promise<PathType[]> => {
  const fetchPaths = locales.map(async locale => {
    const pages = await getTopicRoutesForLocaleToStaticallyBuild(locale)
    return pages.map(page => ({
      slug: page.slug.split('/').filter(p => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}

export const getRoutePaths = async (locales: string[]): Promise<PathType[]> => {
  const fetchPaths = locales.map(async locale => {
    const pages = await getTopicRoutesForLocale(locale)
    return pages.map(page => ({
      slug: page.slug.split('/').filter(p => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}

export const getNewsPaths = async (locales: string[]): Promise<PathType[]> => {
  const fetchPaths = locales.map(async locale => {
    const pages = await getDocumentsForLocale('news', locale)
    return pages.map(page => ({
      slug: page.slug.split('/').filter(p => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}

export const getMagazinePaths = async (
  locales: string[],
): Promise<PathType[]> => {
  const fetchPaths = locales.map(async locale => {
    const pages = await getDocumentsForLocale('magazine', locale)
    return pages.map(page => ({
      slug: page.slug.split('/').filter(p => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}

export const getLocalNewsPaths = async (
  locales: string[],
): Promise<PathType[]> => {
  const fetchPaths = locales.map(async locale => {
    const pages = await getDocumentsForLocale('localNews', locale)
    return pages.map(page => ({
      slug: page.slug.split('/').filter(p => p),
      updatedAt: page._updatedAt,
      locale,
    }))
  })

  return (await Promise.all(fetchPaths)).flat()
}

export const getNewsroomPaths = async (): Promise<PathType[]> => {
  // Use last published news as updatedAt field for newsroom
  const getUpdatedAt = async (
    lang: 'en_GB' | 'nb_NO',
  ): Promise<{ _updatedAt: string }> =>
    await client.fetch(
      groq`*[_type == 'news' && ${sameLang}] | order(${publishDateTimeQuery} desc)[0] {
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
  const getUpdatedAt = async (
    lang: 'en_GB' | 'nb_NO',
  ): Promise<{ _updatedAt: string }> =>
    await client.fetch(
      groq`*[_type == 'magazine' && ${sameLang}] | order(_createdAt desc)[0] {
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
