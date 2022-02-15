import getConfig from 'next/config'

export const getFullUrl = (pathname: string, slug: string): string => {
  const { publicRuntimeConfig } = getConfig()
  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('/[[...slug]]', slug)

  return fullUrl
}
