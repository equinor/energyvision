import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { checkCookieConsent } from '../../common/helpers/checkCookieConsent'
import { CookieType } from '../../types'

/**
 * Returns true if the consent is given for the given consentType.
 * @param consentType Can be either marketing or statistics
 * @returns
 */
export default function useConsent(consentType: CookieType[]): boolean | undefined {
  const [consent, setConsent] = useState<boolean>(checkCookieConsent(consentType))
  const router = useRouter()
  useEffect(() => {
    setConsent(checkCookieConsent(consentType))
  }, [consentType, router.asPath])
  return consent
}
