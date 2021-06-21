import { newsQuery, pageQueryEn, pageQueryNo, pageQueryById } from './queries'
import { mapLocaleToLang } from './localization'

const isSlugID = (slug: string): boolean => {
  // regex magic to see if string is a UUID
  const isATranslation = slug.includes('__i18n_nb_NO')
  console.log('This is a translation', isATranslation)
  const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  return regExp.test(slug.replace('drafts.', '').replace('__i18n_nb_NO', ''))
}

export const getQueryFromSlug = (slugArray: string[] = [''], locale = '') => {
  const [slugStart] = slugArray.filter((part: string) => part !== locale)

  if (isSlugID(slugStart)) {
    // We are in preview mode for content that has currently no slug (no routes)
    return {
      queryParams: { id: slugStart.replace('drafts.', '') },
      query: pageQueryById,
      docType: 'page',
    }
  }

  const slug = `/${slugArray.join('/')}` || ''
  switch (slugStart) {
    case '':
      return {
        queryParams: { slug: [] },
        query: '',
        docType: 'home',
      }
    case 'news':
      return {
        queryParams: { slug: slug },
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
