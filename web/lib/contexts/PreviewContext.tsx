import { createContext, useEffect, useState } from 'react'

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

  useEffect(() => {
    if (isPreview) {
      const cookiebot = document.getElementById('CookieBot')
      cookiebot?.remove()
    }
  }, [isPreview])

  return <PreviewContext.Provider value={{ isPreview, setIsPreview }}>{children}</PreviewContext.Provider>
}
