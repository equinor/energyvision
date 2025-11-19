'use client'
import Script from 'next/script'
import { useProd } from '@/lib/hooks/useProd'

export const SiteImprove = () => {
  const isProd = useProd()
  return isProd ? (
    <Script
      src='https://siteimproveanalytics.com/js/siteanalyze_6003171.js'
      id='siteimprove'
      async
    />
  ) : null
}
