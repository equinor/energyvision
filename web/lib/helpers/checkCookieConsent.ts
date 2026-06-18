import { CookieType } from '../../types'

const checkSingleCookieConsent = (cookiePolicy: CookieType): boolean => {
  if (cookiePolicy === 'none') return true

  if (typeof window !== 'undefined') {
    const consent = window.Cookiebot?.consent

    if (consent) {
      return cookiePolicy in consent && consent[cookiePolicy]
    }
  }

  return false
}

export const checkCookieConsent = (cookiePolicies: CookieType[]): boolean => {
  if (cookiePolicies.length === 1 && cookiePolicies[0] === 'none') return true
  return cookiePolicies
    .map((it) => checkSingleCookieConsent(it))
    .reduce((accumulator, currentValue) => accumulator && currentValue, true)
}
