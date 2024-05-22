import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ConsentType } from './useConsentState'

const getConsentState = (consentType: ConsentType): boolean => {
  // Prevents SSR issues
  if (typeof window !== 'undefined') {
    switch (consentType) {
      case 'statistics':
        return window.Cookiebot.consent.statistics
      case 'marketing':
        return window.Cookiebot.consent.marketing
      default:
        return false
    }
  }
  return false
}

/**
 * Returns true if the consent is given for the given consentType.
 * @param consentType Can be either marketing or statistics
 * @returns
 */
export default function useConsent(consentType: ConsentType): boolean | undefined {
  const [consent, setConsent] = useState<boolean>(getConsentState(consentType))
  const router = useRouter()
  useEffect(() => {
    setConsent(getConsentState(consentType))
  }, [consentType, router.asPath])
  return consent
}
