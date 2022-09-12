import { createContext, useState } from 'react'

type Props = {
  userTyped: boolean
  setUserTyped: React.Dispatch<React.SetStateAction<boolean>>
}

type ProviderProps = {
  children: React.ReactNode
}

export const SearchContext = createContext<Props>({
  userTyped: false,
  setUserTyped: () => {
    return
  },
})

export const SearchContextProvider = ({ children }: ProviderProps) => {
  const [userTyped, setUserTyped] = useState(false)

  return <SearchContext.Provider value={{ userTyped, setUserTyped }}>{children}</SearchContext.Provider>
}
