import { newsQuery } from './queries/news'
import { pageQuery } from './queries/routes'
import { eventQuery } from './queries/event'
import { contentQueryById } from './queries/contentById'
import { mapLocaleToLang } from './localization'

const isSlugID = (slug: string): boolean => {
  const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  return regExp.test(slug.replace('drafts.', '').substr(0, 36))
}

export const getQueryFromSlug = (slugArray: string[] = [''], locale = '') => {
  const [slugStart] = slugArray.filter((part: string) => part !== locale)

  if (isSlugID(slugStart)) {
    // We are in preview mode for content that has currently no slug (no routes)
    //We need to figure out of which type
    return {
      queryParams: { id: slugStart.replace('drafts.', ''), lang: mapLocaleToLang(locale) },
      query: contentQueryById,
    }
  }

  const slug = `/${slugArray.join('/')}` || ''
  switch (slugStart) {
    case '':
      return {
        queryParams: { slug: [], lang: mapLocaleToLang(locale) },
        query: '',
      }
    case 'news':
      return {
        queryParams: { slug: slug, lang: mapLocaleToLang(locale) },
        query: newsQuery,
      }
    case 'event':
      return {
        queryParams: { slug: slug, lang: mapLocaleToLang(locale) },
        query: eventQuery,
      }
    default:
      return {
        queryParams: { slug: slug, lang: mapLocaleToLang(locale) },
        query: pageQuery,
      }
  }
}
