import { Flags } from '@/sanity/helpers/datasetHelpers'
import { sanityFetch } from '@/sanity/lib/live'
import { homePageQuery } from '@/sanity/queries/homePage'
import { localNewsQuery } from '@/sanity/queries/localNews'
import { magazineQuery } from '@/sanity/queries/magazine'
import { newsQuery } from '@/sanity/queries/news'
import { routeQuery } from '@/sanity/queries/routes'
import { magazineSlug, newsSlug } from '@/sitesConfig'
//import { contentQueryById } from '@/sanity/queries/contentById'
import { getNameFromLocale } from '../sanity/localization'

export type QueryParams = {
  id?: string
  slug?: string
  lang?: string
  date?: string
}
/* 
const isSlugID = (slug: string): boolean => {
  const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  return regExp.test(slug.replace('drafts.', '').substr(0, 36))
} */

// API is case sensitive, and we are getting an all lowercase ID from the browser
// while a i18n document has an uppercase ISO code, example: __i18n_nb_NO
/* const parseSlug = (slug: string): string => {
  if (slug.includes('_i18n_')) {
    const length = slug.length
    const iso = slug.slice(length - 2, length)
    return slug.slice(0, length - 2) + iso.toUpperCase()
  }

  return slug
} */

const getQuery = async (
  firstPiece: string,
  secondPiece: string | undefined,
  lang: string,
) => {
  if (firstPiece === '') return homePageQuery
  if (Flags.HAS_NEWS && newsSlug[lang] === firstPiece && secondPiece) {
    // is news
    const { data: localNewsTagsData } = await sanityFetch({
      query: `*[_type == 'localNewsTag']{${lang}}`,
    })
    const localNewsTags = localNewsTagsData
      .map((e: any) => Object.values(e))
      //@ts-ignore:todo
      .flatMap(([e]) => e.toLowerCase().replace(' ', '-'))
    if (
      Flags.HAS_LOCAL_NEWS &&
      localNewsTags.includes(secondPiece.toLowerCase())
    ) {
      // is local news
      return localNewsQuery
    }
    return newsQuery
  }
  if (Flags.HAS_MAGAZINE && magazineSlug[lang] === firstPiece && secondPiece) {
    // is magazine
    return magazineQuery
  }
  // is route
  return routeQuery
}

/* const getPreviewByIdQuery = (slugStart: string, locale: string, currentDate: string) => {
  // We are in preview mode for content that has currently no slug (no routes)
  // We need to figure out of which type
  const documentID = parseSlug(slugStart)

  return {
    queryParams: {
      id: documentID,
      lang: getNameFromLocale(locale),
      date: currentDate,
    },
    query: contentQueryById,
  }
} */

export const getQueryFromSlug = async (
  slugArray: string[] = [''],
  locale = '',
): Promise<{ query: string; queryParams: QueryParams }> => {
  const [firstPiece, secondPiece] = slugArray.filter(
    (part: string) => part !== locale,
  )
  const date = new Date().toISOString().substring(0, 10)

  /*   if (isSlugID(firstPiece)) {
    return getPreviewByIdQuery(firstPiece, locale, date)
  } */

  const slug = `/${slugArray.join('/')}`
  const lang = getNameFromLocale(locale)

  const query = await getQuery(firstPiece, secondPiece, lang)
  return {
    query,
    queryParams: { slug, lang, date },
  }
}
