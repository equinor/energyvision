import { Flags } from '../../common/helpers/datasetHelpers'
import { useEffect, useState } from 'react'

export function useProd() {
  const [isProd, setIsProd] = useState(false)

  useEffect(() => {
    const host = window?.location.origin
    const isLocalHost = host.includes('localhost')
    setIsProd(!isLocalHost && (Flags.IS_DEV || !host.includes('radix.equinor.com')))
  }, [])

  return isProd
}
