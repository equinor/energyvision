import { defaultLanguage, languages } from '../../languages'
import { AllSlugsType } from '../../pageComponents/shared/LocalizationSwitch'

const getValidSlugs = (allSlugs: AllSlugsType) => {
  if (!allSlugs) return []
  const validLanguages = languages.map((lang) => lang.name)
  return allSlugs.filter((e) => e).filter((slug) => validLanguages.includes(slug.lang))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPageSlugs = (data: any) => {
  console.log('getPageSlugs data', data)
  //localnews?
  const isNewsPage = !!data?.pageData?.news
  /*   const pageSlugs = isNewsPage
    ? data?.pageData?.news[0]?.slugs?.allSlugs
    : (data?.pageData?.slugsFromTranslations ?? data?.pageData?.slugs?.allSlugs) */
  const pageSlugs = data?.slugsFromTranslations ?? data?.pageData?.slugs?.allSlugs
  console.log('getPageSlugs pageSlugs', pageSlugs)
  const validSlugs = getValidSlugs((pageSlugs as AllSlugsType) || [])
  const defaultSlug = validSlugs.find((slug) => slug.lang === defaultLanguage.name)
  const filteredSlugs = validSlugs.filter((slug) => slug.lang !== defaultLanguage.name)
  return defaultSlug ? [defaultSlug, ...filteredSlugs] : validSlugs
}

export default getPageSlugs
