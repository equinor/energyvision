'use client' // Error boundaries must be Client Components

import { Button } from '@/core/Button';
import { Typography } from '@/core/Typography';
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='py-20 px-layout-lg w-full flex flex-col items-center'>
      <Typography variant='h2'>We are sorry, something has gone wrong...</Typography>
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
