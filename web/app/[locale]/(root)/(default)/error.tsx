'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Button } from '@/core/Button'
import { Typography } from '@/core/Typography'

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
    <div className='flex w-full flex-col items-center px-layout-lg py-20'>
      <Typography variant='h2'>
        We are sorry, something has gone wrong...
      </Typography>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
