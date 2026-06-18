'use client'

import { useEffect, useState } from 'react'
import { Flags } from '@/sanity/helpers/datasetHelpers'

export function useProd() {
  const [isProd, setIsProd] = useState(false)

  useEffect(() => {
    const host = window?.location.hostname.toLowerCase() || ''
    const isLocalHost = host === 'localhost'
    setIsProd(!isLocalHost && Flags.IS_DEV === false)
  }, [])

  return isProd
}
