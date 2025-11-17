'use client'
import { useEffect, useState } from 'react'
import { CookieType } from '../../types'
import { usePathname } from 'next/navigation'
import { checkCookieConsent } from '../helpers/checkCookieConsent'

/**
 * Returns true if the consent is given for the given consentType.
 * @param consentType Can be either marketing or statistics
 * @returns
 */
export default function useConsent(consentType: CookieType[]): boolean | undefined {
  const [consent, setConsent] = useState<boolean>(checkCookieConsent(consentType))
  const pathname = usePathname()
  useEffect(() => {
    setConsent(checkCookieConsent(consentType))
  }, [consentType, pathname])
  return consent
}
