import { defaultLanguage, languages } from '../../languages'

export const getLocaleFromName = (name: string | undefined): string => {
  return (
    languages.find(lang => lang.name === name)?.locale || defaultLanguage.locale
  )
}

export const getIdFromName = (name: string | undefined): string => {
  return languages.find(lang => lang.name === name)?.id || defaultLanguage.id
}
