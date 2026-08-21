'use client'
import { useCallback, useSyncExternalStore } from 'react'

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
  const hasNoConsentRequirement =
    consentType.length === 1 && consentType[0] === 'none'
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('CookiebotOnAccept', onStoreChange)
    window.addEventListener('CookiebotOnDecline', onStoreChange)

    return () => {
      window.removeEventListener('CookiebotOnAccept', onStoreChange)
      window.removeEventListener('CookiebotOnDecline', onStoreChange)
    }
  }, [])
  const getSnapshot = useCallback(
    () => checkCookieConsent(consentType),
    [consentType],
  )
  const getServerSnapshot = useCallback(
    () => hasNoConsentRequirement,
    [hasNoConsentRequirement],
  )

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
