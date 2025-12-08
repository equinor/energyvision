'use client'
import { FriendlyCaptchaSDK } from '@friendlycaptcha/sdk'
import { type ReactNode, useEffect, useRef } from 'react'
import { FriendlyCaptchaContext } from '@/templates/forms/FriendlyCaptcha'

export const FriendlyCaptchaSdkWrapper = ({
  children,
}: {
  children: ReactNode
}) => {
  const sdk = useRef<FriendlyCaptchaSDK>(undefined)

  useEffect(() => {
    if (!sdk?.current) {
      sdk.current = new FriendlyCaptchaSDK()
    }
  }, [])

  return (
    <FriendlyCaptchaContext.Provider value={sdk.current}>
      {children}
    </FriendlyCaptchaContext.Provider>
  )
}
