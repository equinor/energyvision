import { useInfo } from '@/contexts/infoContext'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { homePageQuery } from '@/sanity/queries/homePage'
import { localNewsQuery } from '@/sanity/queries/localNews'
import { magazineIndexQuery, magazineQuery } from '@/sanity/queries/magazine'
import { newsQuery } from '@/sanity/queries/news'
import { routeQuery } from '@/sanity/queries/routes'
import { localNewsTags, magazineSlug, newsSlug } from '@/sitesConfig'
import { getNameFromIso, getNameFromLocale } from '../localization'
import { newsroomQuery } from '../queries/newsroom'

export type QueryParams = {
  id?: string
  slug?: string
  lang?: string
  date?: string
}

const getQuery = async (
  firstPiece: string,
  secondPiece: string | undefined,
  lang: string,
) => {
  console.log('firstPiece', firstPiece)
  console.log('secondPiece', secondPiece)

  if (!firstPiece || typeof firstPiece === 'undefined' || firstPiece === '') {
    console.log('return homePageQuery')
    return homePageQuery
  }
  if (Flags.HAS_NEWS && newsSlug[lang] === firstPiece) {
    if (
      !secondPiece ||
      typeof secondPiece === 'undefined' ||
      secondPiece === ''
    ) {
      return newsroomQuery
    }
    if (secondPiece) {
      //Check for local news. For now it seems only path /news/... has local news
      if (
        Flags.HAS_LOCAL_NEWS &&
        lang === 'en_GB' &&
        secondPiece &&
        localNewsTags[lang].includes(secondPiece.toLowerCase())
      ) {
        return localNewsQuery
      }
      return newsQuery
    }
  }
  if (Flags.HAS_MAGAZINE && magazineSlug[lang] === firstPiece) {
    if (
      !secondPiece ||
      typeof secondPiece === 'undefined' ||
      secondPiece === ''
    ) {
      return magazineIndexQuery
    }
    if (secondPiece) {
      return magazineQuery
    }
  }
  return routeQuery
}

export const getQueryFromSlug = async (
  slug: string | string[] | undefined,
  locale = '',
): Promise<{ query: string; queryParams: QueryParams }> => {
  console.log('getQueryFromSlug slug', slug)
  let topLevelRoute = ''
  let childRoute: string | undefined
  if (slug && Array.isArray(slug)) {
    const [firstPiece, secondPiece] = slug.filter(
      (part: string) => part !== locale,
    )
    topLevelRoute = firstPiece
    childRoute = secondPiece
  } else if (slug) {
    topLevelRoute = slug
  }

  const lang = getNameFromIso(locale) ?? 'en_GB'

  const query = await getQuery(topLevelRoute, childRoute, lang)
  return {
    query,
    queryParams: {
      slug: Array.isArray(slug) ? `/${slug.join('/')}` : `/${slug ?? ''}`,
      lang,
    },
  }
}
