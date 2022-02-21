import languages from '../languages'

export const defaultLanguage = languages[0]

export const getNameFromLocale = (locale: string | undefined): string => {
  return languages.find((lang) => lang.locale === locale)?.name || defaultLanguage.name
}

export const getIsoFromLocale = (locale: string | undefined): string => {
  return languages.find((lang) => lang.locale === locale)?.iso || defaultLanguage.iso
}

export const getLocaleFromName = (name: string | undefined): string => {
  return languages.find((lang) => lang.name === name)?.locale || defaultLanguage.locale
}
