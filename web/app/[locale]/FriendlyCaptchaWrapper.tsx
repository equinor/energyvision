'use client'
import { FriendlyCaptchaSDK } from '@friendlycaptcha/sdk'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { FriendlyCaptchaContextProvider } from '@/contexts/FriendlyCaptchaContext'

export const FriendlyCaptchaSdkWrapper = ({
  children,
}: {
  children: ReactNode
}) => {
  const [sdk, setSdk] = useState<FriendlyCaptchaSDK | undefined>(undefined)
  const [isHuman, setIsHuman] = useState(false)

  useEffect(() => {
    if (!sdk) {
      setSdk(new FriendlyCaptchaSDK())
    }
  }, [])

  const setHumanState = useCallback(
    (isHuman: boolean) => {
      setIsHuman(isHuman)
    },
    [setIsHuman, isHuman],
  )

  return (
    <FriendlyCaptchaContextProvider
      sdk={sdk}
      setIsHuman={setHumanState}
      isHuman={isHuman}
    >
      {children}
    </FriendlyCaptchaContextProvider>
  )
}
