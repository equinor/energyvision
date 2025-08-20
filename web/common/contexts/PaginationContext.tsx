'use client'
import { createContext, RefObject, useState } from 'react'

type Props = {
  resultsRef: RefObject<HTMLDivElement | null> | undefined
}

type ProviderProps = {
  defaultRef?: RefObject<HTMLDivElement | null> | undefined
  children: React.ReactNode
}

export const PaginationContext = createContext<Props>({
  resultsRef: undefined,
})

export const PaginationContextProvider = ({ defaultRef, children }: ProviderProps) => {
  const [resultsRef] = useState<RefObject<HTMLDivElement | null> | undefined>(defaultRef)

  return <PaginationContext.Provider value={{ resultsRef }}>{children}</PaginationContext.Provider>
}
