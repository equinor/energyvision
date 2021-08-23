import { newsQuery } from './queries/news'
import { pageQueryEn, pageQueryNo } from './queries/routes'
import { pageQueryById } from './queries/pages'
import { mapLocaleToLang } from './localization'

const isSlugID = (slug: string): boolean => {
  // regex magic to see if string is a UUID

  const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  return regExp.test(slug.replace('drafts.', '').substr(0, 36))
}

export const getQueryFromSlug = (slugArray: string[] = [''], locale = '') => {
  const [slugStart] = slugArray.filter((part: string) => part !== locale)

  if (isSlugID(slugStart)) {
    const isATranslation = slugStart.includes('__i18n')
    console.log('This is a translation', isATranslation)
    // We are in preview mode for content that has currently no slug (no routes)
    return {
      queryParams: { id: slugStart.replace('drafts.', ''), lang: mapLocaleToLang(locale) },
      query: pageQueryById,
      docType: 'page',
    }
  }

  const slug = `/${slugArray.join('/')}` || ''
  switch (slugStart) {
    case '':
      return {
        queryParams: { slug: [], lang: mapLocaleToLang(locale) },
        query: '',
        docType: 'home',
      }
    case 'news':
      return {
        queryParams: { slug: slug, lang: mapLocaleToLang(locale) },
        query: newsQuery,
        docType: 'news',
      }
    default:
      return {
        queryParams: { slug: slug, pageType: `${slugStart}`, lang: mapLocaleToLang(locale) },
        query: locale === 'en' ? pageQueryEn : pageQueryNo,
        docType: 'page',
      }
  }
}
