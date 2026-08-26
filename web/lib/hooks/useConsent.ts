'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { CookieType } from '../../types'
import { checkCookieConsent } from '../helpers/checkCookieConsent'

/**
 * Returns true if the consent is given for the given consentType.
 * @param consentType Can be either marketing or statistics
 * @returns
 */
export default function useConsent(
  consentType: CookieType[],
): boolean | undefined {
  const [consent, setConsent] = useState<boolean>(
    checkCookieConsent(consentType),
  )
  const pathname = usePathname()
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setConsent(checkCookieConsent(consentType))
  }, [consentType, pathname])
  return consent
}
