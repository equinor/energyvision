'use client'
import { type ReactNode, useCallback, useState } from 'react'
import { FriendlyCaptchaContextProvider } from '@/contexts/FriendlyCaptchaContext'

export const FriendlyCaptchaSdkWrapper = ({
  children,
}: {
  children: ReactNode
}) => {
  const [isHuman, setIsHuman] = useState(false)
  const setHumanState = useCallback((isHuman: boolean) => {
    setIsHuman(isHuman)
  }, [])

  return (
    <FriendlyCaptchaContextProvider
      setIsHuman={setHumanState}
      isHuman={isHuman}
    >
      {children}
    </FriendlyCaptchaContextProvider>
  )
}
