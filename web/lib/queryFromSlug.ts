import { newsQuery } from './queries/news'
import { pageQuery } from './queries/routes'
import { contentQueryById } from './queries/contentById'
import { getNameFromLocale } from './localization'

const isSlugID = (slug: string): boolean => {
  const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  return regExp.test(slug.replace('drafts.', '').substr(0, 36))
}

export const getQueryFromSlug = (slugArray: string[] = [''], locale = '') => {
  const [slugStart] = slugArray.filter((part: string) => part !== locale)
  // This is used for the event query in order to filter past events
  // This is an easy and simple approach, is it too easy and naive?
  // We don't use the time information atm
  const currentDate = new Date().toISOString().substring(0, 10)

  if (isSlugID(slugStart)) {
    // We are in preview mode for content that has currently no slug (no routes)
    //We need to figure out of which type

    const publishedAndDraftIds = slugStart.startsWith('drafts.')
      ? [slugStart, slugStart.replace('drafts.', '')]
      : [slugStart, 'drafts.${slugStart']

    // console.log(publishedAndDraftIds)

    return {
      queryParams: {
        id: publishedAndDraftIds,
        lang: getNameFromLocale(locale),
        date: currentDate,
      },
      query: contentQueryById,
    }
  }

  const slug = `/${slugArray.join('/')}` || ''
  switch (slugStart) {
    case 'news':
      return {
        queryParams: { slug: slug, lang: getNameFromLocale(locale), date: currentDate },
        query: newsQuery,
      }
    default:
      return {
        queryParams: { slug: slug, lang: getNameFromLocale(locale), date: currentDate },
        query: pageQuery,
      }
  }
}
