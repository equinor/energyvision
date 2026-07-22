import { defaultLanguage } from '@/languageConfig'
import { getLocaleFromIso } from '@/sanity/helpers/localization'

export const getLocalizedHref = (
  slug: string | undefined,
  localeIso: string | undefined,
): string => {
  if (!slug) return ''

  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`
  const localePrefix =
    localeIso && localeIso !== defaultLanguage.iso
      ? `/${getLocaleFromIso(localeIso)}`
      : ''

  if (!localePrefix) return normalizedSlug

  if (
    normalizedSlug === localePrefix ||
    normalizedSlug.startsWith(`${localePrefix}/`)
  ) {
    return normalizedSlug
  }

  return `${localePrefix}${normalizedSlug}`
}