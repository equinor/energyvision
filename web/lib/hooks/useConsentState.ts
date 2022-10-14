import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Flags } from '../../common/helpers/datasetHelpers'

//COOKIEBOT
declare global {
  interface Window {
    Cookiebot: any
  }
}

export type ConsentType = 'marketing' | 'statistics'

function useConsentState(consentType: ConsentType, callback: () => void, cleanup?: () => void) {
  const [consent, changeConsent] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (!Flags.IS_DEV) return
    const manageCookies = () => {
      if (consentType === 'marketing') {
        changeConsent(window?.Cookiebot.consent.marketing)
      } else if (consentType === 'statistics') {
        changeConsent(window?.Cookiebot.consent.statistics)
      }
    }
    window?.addEventListener('CookiebotOnAccept', manageCookies)
    window?.addEventListener('CookiebotOnDecline', manageCookies)
    return () => {
      window.removeEventListener('CookiebotOnAccept', manageCookies)
      window.removeEventListener('CookiebotOnDecline', manageCookies)
    }
  }, [consentType])

  useEffect(() => {
    if (!Flags.IS_DEV) return
    if (
      !(window?.location.origin.includes('radix.equinor.com') || window?.location.origin.includes('localhostss')) &&
      consent
    ) {
      callback()
      return () => {
        if (cleanup) cleanup()
      }
    }
  }, [router.asPath, consent])
}
export default useConsentState
