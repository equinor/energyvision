import { getAllDomainUrls } from '@/sitesConfig'

export const isEquinorUrl = (slug: string) => {
  return getAllDomainUrls().some(allowedUrl =>
    slug.toLowerCase().startsWith(allowedUrl),
  )
}
