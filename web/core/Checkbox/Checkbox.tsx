'use client'
import {
  Checkbox as EdsCheckbox,
  type CheckboxProps as EdsCheckboxProps,
} from '@equinor/eds-core-react'
import { forwardRef, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export type CheckboxProps = EdsCheckboxProps

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ children, ...rest }, ref) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])
    // Return a visual skeletal placeholder during SSR to prevent layout shifting
    if (!mounted) {
      return (
        <div className='flex'>
          <div className='m-3 h-6 w-6 animate-pulse rounded bg-gray-200' />
          <div className='my-3 h-6 w-24 animate-pulse rounded bg-gray-200' />
        </div>
      )
    }
    return (
      <EdsCheckbox
        ref={ref}
        {...rest}
        className={twMerge('[&>span]:text-base')}
      >
        {children}
      </EdsCheckbox>
    )
  },
)
