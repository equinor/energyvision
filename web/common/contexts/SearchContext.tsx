import { createContext, useState } from 'react'

type Props = {
  searchState: URLSearchParams
  setSearchState: React.Dispatch<React.SetStateAction<URLSearchParams>>
}

type ProviderProps = {
  children: React.ReactNode
}

export const SearchContext = createContext<Props>({
  searchState: undefined,
  setSearchState: () => {
    return
  },
})

export const SearchContextProvider = ({ children }: ProviderProps) => {
  const [searchState, setSearchState] = useState(false)

  return <SearchContext.Provider value={{ searchState, setSearchState }}>{children}</SearchContext.Provider>
}
