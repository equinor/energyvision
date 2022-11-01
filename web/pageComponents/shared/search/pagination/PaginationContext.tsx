import { createContext, RefObject, useState } from 'react'

type Props = {
  resultsRef: RefObject<HTMLDivElement> | undefined
}

type ProviderProps = {
  defaultRef?: RefObject<HTMLDivElement> | undefined
  children: React.ReactNode
}

export const PaginationContext = createContext<Props>({
  resultsRef: undefined,
})

export const PaginationContextProvider = ({ defaultRef, children }: ProviderProps) => {
  const [resultsRef] = useState<RefObject<HTMLDivElement> | undefined>(defaultRef)

  return <PaginationContext.Provider value={{ resultsRef }}>{children}</PaginationContext.Provider>
}
