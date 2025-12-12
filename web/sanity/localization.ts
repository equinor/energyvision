// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { defaultLanguage, languages } from '../languageConfig'

export const getNameFromLocale = (locale: string | undefined): string => {
  return (
    languages.find(lang => lang.locale === locale)?.name || defaultLanguage.name
  )
}

export const getIsoFromLocale = (locale: string | undefined): string => {
  return (
    languages.find(lang => lang.locale === locale)?.iso || defaultLanguage.iso
  )
}

export const getLocaleFromName = (name: string | undefined): string => {
  return (
    languages.find(lang => lang.name === name)?.locale || defaultLanguage.locale
  )
}
export const getLocaleFromIso = (iso: string | undefined): string => {
  return (
    languages.find(lang => lang.iso === iso)?.locale || defaultLanguage.locale
  )
}
export const getIsoFromName = (name: string | undefined): string => {
  return languages.find(lang => lang.name === name)?.iso || defaultLanguage.iso
}
export const getNameFromIso = (iso: string | undefined): string => {
  return languages.find(lang => lang.iso === iso)?.name || defaultLanguage.name
}
