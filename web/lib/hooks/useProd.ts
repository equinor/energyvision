'use client'

import { useEffect, useState } from 'react'
import { Flags } from '@/sanity/helpers/datasetHelpers'

export function useProd() {
  const [isProd, setIsProd] = useState(false)

  useEffect(() => {
    const host = window?.location.origin
    const isLocalHost = host.includes('localhost')
    setIsProd(
      !isLocalHost && (Flags.IS_DEV || !host.includes('radix.equinor.com')),
    )
  }, [])

  return isProd
}
