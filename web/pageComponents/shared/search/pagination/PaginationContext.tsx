import { createContext, RefObject, useState } from 'react'

type Props = {
  resultsRef: RefObject<HTMLDivElement> | undefined
  setResultsRef: React.Dispatch<React.SetStateAction<RefObject<HTMLDivElement> | undefined>>
}

type ProviderProps = {
  defaultRef?: RefObject<HTMLDivElement> | undefined
  children: React.ReactNode
}

export const PaginationContext = createContext<Props>({
  resultsRef: undefined,
  setResultsRef: () => {
    return
  },
})

export const PaginationContextProvider = ({ defaultRef, children }: ProviderProps) => {
  const [resultsRef, setResultsRef] = useState<RefObject<HTMLDivElement> | undefined>(defaultRef)

  return <PaginationContext.Provider value={{ resultsRef, setResultsRef }}>{children}</PaginationContext.Provider>
}
