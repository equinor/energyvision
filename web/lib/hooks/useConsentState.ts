import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Flags } from '../../common/helpers/datasetHelpers'
import { CookieType } from '../../types'
import { checkCookieConsent } from '../../common/helpers/checkCookieConsent'

//COOKIEBOT
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cookiebot: any
  }
}

function useConsentState(consentType: CookieType[], callback: () => void, cleanup?: () => void) {
  const [consent, changeConsent] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const manageCookies = () => {
      changeConsent(checkCookieConsent(consentType))
    }
    window?.addEventListener('CookiebotOnAccept', manageCookies)
    window?.addEventListener('CookiebotOnDecline', manageCookies)
    return () => {
      window.removeEventListener('CookiebotOnAccept', manageCookies)
      window.removeEventListener('CookiebotOnDecline', manageCookies)
    }
  }, [consentType])

  useEffect(() => {
    // Disable Radix.equinor.com due to SiteImprove (possibly) collecting wrong data
    const host = window?.location.origin
    const isLocalHost = host.includes('localhost')
    const enableConsentLogic = !isLocalHost && (Flags.IS_DEV || !host.includes('radix.equinor.com'))
    if (enableConsentLogic && consent) {
      callback()
      return () => {
        if (cleanup) cleanup()
      }
    }
  }, [router.asPath, consent, callback, cleanup])
}
export default useConsentState
