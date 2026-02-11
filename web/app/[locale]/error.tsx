'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import Footer from '@/sections/Footer/Footer'
import ClientHeader from '@/sections/Header/ClientHeader'
import ErrorPage from '@/templates/errorPage/ErrorPage'

// biome-ignore lint/suspicious/noShadowRestrictedNames: Nextjs docs
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main>
      <ClientHeader />
      <ErrorPage variant='500' />
      <Footer />
    </main>
  )
}
