import { defaultLanguage } from '@/languageConfig'
import { host } from '@/lib/config'

// @TODO: figure out if this is still the optimal way of doing this
// Compare with how we handle canonicals in web/pageComponents/shared/Header.tsx
export const getFullUrl = (
  pathname: string,
  slug: string,
  locale = '',
): string => {
  const intl = locale === defaultLanguage?.locale ? '' : `/${locale}`

  const fullUrlDyn =
    pathname.indexOf('http') === -1 ? `${host.url}${intl}${pathname}` : pathname

  if (fullUrlDyn.includes('[...pagePath]')) {
    return fullUrlDyn.replace('[...pagePath]', slug)
  }

  return fullUrlDyn.replace('/[[...slug]]', slug)
}

export const decodeSlugs = (
  slug: string | string[] | undefined,
): string | string[] | undefined => {
  if (!slug) return slug
  const decodedSlug = Array.isArray(slug)
    ? slug.map(it => decodeURIComponent(it))
    : decodeURIComponent(slug)
  return decodedSlug
}
