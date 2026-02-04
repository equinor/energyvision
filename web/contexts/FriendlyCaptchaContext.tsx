'use client'
import { FriendlyCaptchaSDK } from '@friendlycaptcha/sdk'
import { createContext, Dispatch, PropsWithChildren, type RefObject, SetStateAction, useState } from 'react'

type Props = {
isHuman: boolean,
setIsHuman:(isHuman:boolean) => void,
sdk: FriendlyCaptchaSDK|undefined
}


export const FriendlyCaptchaContext = createContext<Props>({
isHuman: false,
setIsHuman:(isHuman:boolean) => {},
sdk:undefined
})

export const FriendlyCaptchaContextProvider = ({
  children,
  isHuman,
  sdk,
  setIsHuman
}: PropsWithChildren<{isHuman:boolean, sdk:FriendlyCaptchaSDK|undefined, setIsHuman:(isHuman:boolean)=>void}>) => {
  return (
    <FriendlyCaptchaContext.Provider value={{ isHuman:isHuman, setIsHuman, sdk }}>
      {children}
    </FriendlyCaptchaContext.Provider>
  )
}
