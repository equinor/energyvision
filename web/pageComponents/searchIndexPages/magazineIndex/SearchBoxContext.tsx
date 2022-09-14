import { createContext, useRef, useState } from 'react'

type Props = {
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputRef?: React.RefObject<HTMLInputElement>
}

type ProviderProps = {
  children: React.ReactNode
}

export const SearchBoxContext = createContext<Props>({
  inputValue: '',
  setInputValue: () => {
    return
  },
  inputRef: undefined,
})

export const SearchBoxContextProvider = ({ children }: ProviderProps) => {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <SearchBoxContext.Provider value={{ inputValue, setInputValue, inputRef }}>{children}</SearchBoxContext.Provider>
  )
}
