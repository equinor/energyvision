'use client'
import { FriendlyCaptchaSDK } from '@friendlycaptcha/sdk'
import { type ReactNode, useEffect, useState } from 'react'
import { FriendlyCaptchaContext } from '@/templates/forms/FriendlyCaptcha'

export const FriendlyCaptchaSdkWrapper = ({
  children,
}: {
  children: ReactNode
}) => {
  const [sdk, setSdk] = useState<FriendlyCaptchaSDK|undefined>(undefined)

  useEffect(() => {
    if (!sdk) {
      setSdk(new FriendlyCaptchaSDK())
    }
  }, [])

  return (
    <FriendlyCaptchaContext.Provider value={sdk}>
      {children}
    </FriendlyCaptchaContext.Provider>
  )
}
