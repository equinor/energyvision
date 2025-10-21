'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { GTM_ID, pageview } from '@/lib/gtm'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GTM_ID) return
    const url = `${pathname}?${searchParams}`
    pageview(url)
  }, [pathname, searchParams])

  useEffect(() => {
    if (window.self === window.top) {
      if (window?.Cookiebot) {
        try {
          window.Cookiebot?.runScripts()
        } catch (error) {
          console.error('An error occured while trying to run the Cookiebot script: ', error)
        }
      }
    }
  }, [pathname])
  return null
}
