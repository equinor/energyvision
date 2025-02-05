import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CookieType } from '../../types'
import { checkCookieConsent } from '../../common/helpers/checkCookieConsent'
import { useProd } from './useProd'

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
  const enableConsentLogic = useProd()

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
    if (enableConsentLogic && consent) {
      callback()
      return () => {
        if (cleanup) cleanup()
      }
    }
  }, [router.asPath, consent, callback, cleanup, enableConsentLogic])
}
export default useConsentState
