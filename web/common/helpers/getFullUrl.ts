import getConfig from 'next/config'
import { defaultLanguage } from '../../languages'

export const getFullUrl = (pathname: string, slug: string, locale = ''): string => {
  const { publicRuntimeConfig } = getConfig()

  const intl = locale === defaultLanguage?.locale ? '' : `/${locale}`

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${intl}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('/[[...slug]]', slug)

  return fullUrl
}
