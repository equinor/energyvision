import { defaultLanguage, languages } from '../../languages'
import { AllSlugsType } from '../../pageComponents/shared/LocalizationSwitch'

const getValidSlugs = (allSlugs: AllSlugsType) => {
  if (!allSlugs) return []
  const validLanguages = languages.map((lang) => lang.name)
  return allSlugs.filter((slug) => validLanguages.includes(slug.lang))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPageSlugs = (data: any) => {
  const isNewsPage = !!data?.pageData?.news
  const pageSlugs = isNewsPage ? data?.pageData?.news[0]?.slugs?.allSlugs : data?.pageData?.slugs?.allSlugs
  const validSlugs = getValidSlugs((pageSlugs as AllSlugsType) || [])
  const defaultSlug = validSlugs.find((slug) => slug.lang === defaultLanguage.name)
  const filteredSlugs = validSlugs.filter((slug) => slug.lang !== defaultLanguage.name)
  return defaultSlug ? [defaultSlug, ...filteredSlugs] : validSlugs
}

export default getPageSlugs
