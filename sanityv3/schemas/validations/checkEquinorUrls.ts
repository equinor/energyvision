import { getAllDomainUrls } from '../../../satellitesConfig'

export const isEquinorUrl = (slug: string) => {
  const isAllowed = getAllDomainUrls().some((allowedUrl) => slug.toLowerCase().startsWith(allowedUrl))
  return isAllowed
}
