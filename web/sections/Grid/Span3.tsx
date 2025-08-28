'use client'
import { twMerge } from 'tailwind-merge'
import { HTMLAttributes, forwardRef } from 'react'
import { mapGridContent } from './mapGridContent'

export type Span3Props = {
  data: any
  className?: string
} & HTMLAttributes<HTMLDivElement>

const Span3 = forwardRef<HTMLDivElement, Span3Props>(function Span3({ data, className = '', ...rest }, ref) {
  const minHeight = data?.content?.type === 'videoPlayer' ? '' : 'min-h-[350px] lg:min-h-[600px]'

  return (
    <div
      ref={ref}
      className={twMerge(`h-full w-full border border-moss-green-60 lg:col-span-3 ${minHeight} `, className)}
      {...rest}
    >
      {mapGridContent(data?.content, 'span3')}
    </div>
  )
})

export default Span3
