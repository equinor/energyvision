import { host } from '@/lib/config'
import { defaultLanguage } from '../../languages'

// @TODO: figure out if this is still the optimal way of doing this
// Compare with how we handle canonicals in web/pageComponents/shared/Header.tsx
export const getFullUrl = (pathname: string, slug: string, locale = ''): string => {
  const intl = locale === defaultLanguage?.locale ? '' : `/${locale}`

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${host.url}${intl}${pathname}` : pathname

  if (fullUrlDyn.includes('[...pagePath]')) {
    return fullUrlDyn.replace('[...pagePath]', slug)
  }

  return fullUrlDyn.replace('/[[...slug]]', slug)
}
