export const checkCookieConsent = (cookiePolicy: string): boolean => {
  if (cookiePolicy === 'none') return true

  if (typeof window !== 'undefined') {
    const consent = window.Cookiebot?.consent

    if (consent) {
      return cookiePolicy in consent && consent[cookiePolicy]
    }
  }

  return false
}
