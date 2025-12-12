type AllSitesLinkType = 'internal' | 'external'

// We should probably fetch this from Sanity at some point instead
// of having it hardcoded
export const getAllSitesLink = (
  type: AllSitesLinkType = 'internal',
  locale = 'en-GB',
): string => {
  if (type === 'external') return 'https://www.equinor.com/about-us/all-sites'

  return locale === 'nb-NO'
    ? 'no/om-oss/alle-nettsteder'
    : '/about-us/all-sites'
}
