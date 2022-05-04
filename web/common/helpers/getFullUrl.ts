import getConfig from 'next/config'
import { defaultLanguage } from '../../languages'

export const getFullUrl = (pathname: string, slug: string, locale = ''): string => {
  const { publicRuntimeConfig } = getConfig()

  const intl = locale === defaultLanguage?.locale ? '' : `/${locale}`

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${intl}${pathname}` : pathname

  if (fullUrlDyn.includes('[...pagePath]')) {
    return fullUrlDyn.replace('[...pagePath]', slug)
  }

  return fullUrlDyn.replace('/[[...slug]]', slug)
}
