'use client'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { LocaleSlug } from '@/sanity/pages/utils'

import type {
  FooterColumns,
  MenuData,
  SimpleMenuData,
  StickyMenuData,
} from '@/types'

export type HeaderData = {
  slugs: LocaleSlug[]
  stickyMenuData?: StickyMenuData
}
export interface PageContextType {
  headerData: HeaderData | undefined
  siteMenuData: MenuData | SimpleMenuData
  footerData: {
    footerColumns: FooterColumns[]
  }
  storeSiteMenuData: (siteMenuData: any) => void
  storeFooterData: (footerData: any) => void
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
  initialFooterData,
}: PropsWithChildren<{
  initialSiteMenuData: PageContextType['siteMenuData']
  initialFooterData: PageContextType['footerData']
}>) => {
  const [headerData, setHeaderData] = useState<HeaderData>()
  const [siteMenuData, setSiteMenuData] = useState<any>(initialSiteMenuData)
  const [footerData, setFooterData] = useState<any>(initialFooterData)

  // Memoize functions using useCallback
  const updateHeaderData = useCallback((headerData: HeaderData) => {
    setHeaderData(headerData)
  }, [])
  const storeSiteMenuData = useCallback((siteMenuData: any) => {
    setSiteMenuData(siteMenuData)
  }, [])
  const storeFooterData = useCallback((footerData: any) => {
    setFooterData(footerData)
  }, [])

  // Memoize the value object using useMemo, depending on stable values
  const value = useMemo(
    () => ({
      headerData,
      siteMenuData,
      footerData,
      storeFooterData,
      storeSiteMenuData,
      updateHeaderData,
    }),
    [
      headerData,
      updateHeaderData,
      footerData,
      siteMenuData,
      storeFooterData,
      storeSiteMenuData,
    ],
  )

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}
