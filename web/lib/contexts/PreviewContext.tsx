import { createContext, useState } from 'react'

type Props = {
  isPreview: boolean
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>
}

type ProviderProps = {
  children: React.ReactNode
}

export const PreviewContext = createContext<Props>({
  isPreview: false,
  setIsPreview: () => {
    return
  },
})

export const PreviewContextProvider = ({ children }: ProviderProps) => {
  const [isPreview, setIsPreview] = useState(false)

  return <PreviewContext.Provider value={{ isPreview, setIsPreview }}>{children}</PreviewContext.Provider>
}
