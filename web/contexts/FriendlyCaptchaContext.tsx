'use client'
import { FriendlyCaptchaSDK } from '@friendlycaptcha/sdk'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  type RefObject,
  SetStateAction,
  useState,
} from 'react'

type Props = {
  isHuman: boolean
  setIsHuman: (isHuman: boolean) => void
}

export const FriendlyCaptchaContext = createContext<Props>({
  isHuman: false,
  setIsHuman: (isHuman: boolean) => {},
})

export const FriendlyCaptchaContextProvider = ({
  children,
  isHuman,

  setIsHuman,
}: PropsWithChildren<{
  isHuman: boolean
  setIsHuman: (isHuman: boolean) => void
}>) => {
  return (
    <FriendlyCaptchaContext.Provider value={{ isHuman: isHuman, setIsHuman }}>
      {children}
    </FriendlyCaptchaContext.Provider>
  )
}
