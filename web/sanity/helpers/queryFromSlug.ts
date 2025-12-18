import { Flags } from '@/sanity/helpers/datasetHelpers'
import { homePageQuery } from '@/sanity/queries/homePage'
import { localNewsQuery } from '@/sanity/queries/localNews'
import { magazineIndexQuery, magazineQuery } from '@/sanity/queries/magazine'
import { newsQuery } from '@/sanity/queries/news'
import { routeQuery } from '@/sanity/queries/routes'
import { localNewsTags, magazineSlug, newsSlug } from '@/sitesConfig'
import { newsroomQuery } from '../queries/newsroom'
import { getNameFromIso } from './localization'

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
  if (!firstPiece || typeof firstPiece === 'undefined' || firstPiece === '') {
    console.log('return homePageQuery')
    return homePageQuery
  }
  if (Flags.HAS_NEWS && newsSlug[lang] === firstPiece) {
    console.log('is news')
    if (
      !secondPiece ||
      typeof secondPiece === 'undefined' ||
      secondPiece === ''
    ) {
      console.log('return newsroomQuery')
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
        console.log('return localNewsQuery')
        return localNewsQuery
      }
      console.log('return newspage Query')
      return newsQuery
    }
  }
  if (Flags.HAS_MAGAZINE && magazineSlug[lang] === firstPiece) {
    if (
      !secondPiece ||
      typeof secondPiece === 'undefined' ||
      secondPiece === ''
    ) {
      console.log('return magazineIndexQuery')
      return magazineIndexQuery
    }
    if (secondPiece) {
      console.log('return magazineQuery')
      return magazineQuery
    }
  }
  console.log('return routeQuery')
  return routeQuery
}

export const getQueryFromSlug = async (
  slug: string | string[] | undefined,
  locale = '',
): Promise<{ query: string; queryParams: QueryParams }> => {
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
