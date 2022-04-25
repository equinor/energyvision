type AllSitesLinkType = 'internal' | 'external'

// We should probably fetch this from Sanity at some point instead
// of having it hardcoded
export const getALlSitesLink = (type: AllSitesLinkType = 'internal', locale = 'en'): string => {
  if (type === 'external') return 'https://www.equinor.com/about-us/all-sites'

  return locale === 'no' ? '/om-oss/alle-nettsteder' : '/about-us/all-sites'
}
