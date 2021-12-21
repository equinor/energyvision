import languages from '../languages'

export const defaultLanguage = languages[0]

export const getNameFromLocale = (locale: string | undefined): string => {
  return languages.find((lang) => lang.locale === locale)?.name || defaultLanguage.iso
}

export const getIsoFromLocale = (locale: string | undefined): string => {
  return languages.find((lang) => lang.locale === locale)?.iso || defaultLanguage.iso
}
