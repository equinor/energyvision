import { getAllDomainUrls } from '../../../satellitesConfig.js'

export const isEquinorUrl = (slug: string) => {
  return getAllDomainUrls().some(allowedUrl =>
    slug.toLowerCase().startsWith(allowedUrl),
  )
}
