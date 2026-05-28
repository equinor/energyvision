'use client'
import type { SanityImageObject } from '@sanity/image-url'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { LocaleSlug } from '@/sanity/pages/utils'
import type { MenuData, SimpleMenuData } from '@/types'
import type { StickyMenuProps } from '../sections/StickyMenu/StickyMenu'

export type HeaderData = {
  slugs: LocaleSlug[]
  stickyMenuData?: StickyMenuProps
}
export interface PageContextType {
  headerData: HeaderData | undefined
  siteMenuData: MenuData | SimpleMenuData
  errorImage: SanityImageObject
  storeSiteMenuData: (siteMenuData: any) => void
  updateHeaderData: (headerData: HeaderData) => void
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
  initialSiteMenuData,
  initialErrorImage,
}: PropsWithChildren<{
  initialSiteMenuData: PageContextType['siteMenuData']
  initialErrorImage: PageContextType['errorImage']
}>) => {
  const [headerData, setHeaderData] = useState<HeaderData>()
  const [siteMenuData, setSiteMenuData] = useState<MenuData | SimpleMenuData>(
    initialSiteMenuData,
  )
  const [errorImage] = useState<any>(initialErrorImage)

  // Memoize functions using useCallback
  const updateHeaderData = useCallback((headerData: HeaderData) => {
    setHeaderData(headerData)
  }, [])
  const storeSiteMenuData = useCallback((siteMenuData: any) => {
    setSiteMenuData(siteMenuData)
  }, [])

  // Memoize the value object using useMemo, depending on stable values
  const value = useMemo(
    () => ({
      headerData,
      siteMenuData,
      storeSiteMenuData,
      updateHeaderData,
      errorImage,
    }),
    [headerData, updateHeaderData, siteMenuData, storeSiteMenuData, errorImage],
  )

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}
