'use client'
import { FriendlyCaptchaContext } from '@/templates/forms/FriendlyCaptcha'
import { FriendlyCaptchaSDK } from '@friendlycaptcha/sdk'
import { ReactNode, useEffect, useRef } from 'react'

export const FriendlyCaptchaSdkWrapper = ({ children }: { children: ReactNode }) => {
  const sdk = useRef<FriendlyCaptchaSDK>(undefined)
  useEffect(() => {
    sdk.current = new FriendlyCaptchaSDK()
  }, [])
  return <FriendlyCaptchaContext.Provider value={sdk.current}>{children}</FriendlyCaptchaContext.Provider>
}
