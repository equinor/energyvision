'use client'
import type { SanityImageObject } from '@sanity/image-url'
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'
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
  currentSlug: LocaleSlug
}
export interface PageContextType {
  errorImage: SanityImageObject
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
