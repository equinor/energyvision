import { getAllDomainUrls } from '../../../satellitesConfig'

export const isEquinorUrl = (slug: string) => {
  return getAllDomainUrls().some((allowedUrl) => slug.toLowerCase().startsWith(allowedUrl))
}
