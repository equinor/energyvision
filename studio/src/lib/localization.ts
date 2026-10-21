import { defaultLanguage, languages } from '../../languages'

/**
 * Converts Sanity schema field name format to ISO locale code
 * Example: "en_GB" → "en-GB", "nb_NO" → "nb-NO"
 */
const schemaNameToIso = (schemaName: string): string =>
  schemaName.replace('_', '-')

export const getLocaleFromName = (name: string | undefined): string => {
  if (!name) return defaultLanguage.locale
  const iso = schemaNameToIso(name)
  return languages.find(lang => lang.iso === iso)?.locale || defaultLanguage.locale
}

export const getIdFromName = (name: string | undefined): string => {
  if (!name) return defaultLanguage.id
  const iso = schemaNameToIso(name)
  return languages.find(lang => lang.iso === iso)?.id || defaultLanguage.id
}
