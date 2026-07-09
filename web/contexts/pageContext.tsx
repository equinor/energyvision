'use client'

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { Image } from '@/core/Image/imageUtilities'
import type { LocaleSlug } from '@/sanity/pages/utils'
import type { ColorKeyTokens } from '@/styles/colorKeyToUtilityMap'
import type { StickyMenuLinkType } from '../sections/StickyMenu/StickyMenu'

export type HeaderData = {
  slugs: LocaleSlug[]
  stickyMenuData?: {
    title: string
    background: keyof ColorKeyTokens
    links: StickyMenuLinkType[]
  }
  currentSlug: LocaleSlug | undefined
}
export interface PageContextType {
  errorImage: Image
}

const PageContext = createContext<PageContextType>({} as PageContextType)

export const usePage = () => {
  const context = useContext(PageContext)
  if (context === null) {
    throw new Error('usePage must be used within a PageProvider')
  }
  return context
}

export const PageProvider = ({
  children,
  initialErrorImage,
}: PropsWithChildren<{
  initialErrorImage: PageContextType['errorImage']
}>) => {
  const [errorImage] = useState<any>(initialErrorImage)

  // Memoize the value object using useMemo, depending on stable values
  const value = useMemo(
    () => ({
      errorImage,
    }),
    [errorImage],
  )

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}
