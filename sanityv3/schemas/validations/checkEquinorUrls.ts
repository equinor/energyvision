import datasets from '../../../satellites.json' assert { type: 'json' }
import { getDomain } from '../../../satellitesConfig'

export const isEquinorUrl = (slug: string) => {
  const urls = datasets.map((dataset) => getDomain(dataset))
  const isAllowed = urls.some((allowedUrl) => slug.toLowerCase().startsWith(allowedUrl))
  return isAllowed
}
