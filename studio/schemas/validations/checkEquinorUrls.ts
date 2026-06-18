import { getAllDomainUrls } from '@energyvision/shared/satelliteConfig'

export const isEquinorUrl = (slug: string) => {
  return getAllDomainUrls().some(allowedUrl =>
    slug.toLowerCase().startsWith(allowedUrl),
  )
}
