import { getAllDomainUrls } from '../../../satellitesConfig.mjs'

export const isEquinorUrl = (slug: string) => {
  return getAllDomainUrls().some(allowedUrl =>
    slug.toLowerCase().startsWith(allowedUrl),
  )
}
