'use client'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export interface InfoContextType {
  localNewsTags: string[]
  storeLocalNewsTags: (tags: string[]) => void
}

const InfoContext = createContext<InfoContextType>({} as InfoContextType)

export const useInfo = () => {
  const context = useContext(InfoContext)
  if (context === null) {
    throw new Error('useInfo must be used within a InfoProvider')
  }
  return context
}

export const InfoProvider = ({ children }: { children: ReactNode }) => {
  const [localNewsTags, setLocalNewsTags] = useState<string[]>([
    'UK',
    'US',
    'EV',
  ])

  // Memoize functions using useCallback
  const storeLocalNewsTags = useCallback((tags: string[]) => {
    setLocalNewsTags(tags)
  }, [])

  // Memoize the value object using useMemo, depending on stable values
  const value = useMemo(
    () => ({
      localNewsTags,
      storeLocalNewsTags,
    }),
    [localNewsTags, storeLocalNewsTags],
  )

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>
}
