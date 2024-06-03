import { twMerge } from 'tailwind-merge'
import { HTMLAttributes, forwardRef } from 'react'
import { mapGridContent } from './mapGridContent'

export type Span3Props = {
  data: any
  className?: string
} & HTMLAttributes<HTMLDivElement>

const Span3 = forwardRef<HTMLDivElement, Span3Props>(function Span3({ data, className = '', ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={twMerge(
        `lg:col-span-3 
        w-full
        h-full
        border border-moss-green-60
        `,
        className,
      )}
      {...rest}
    >
      {mapGridContent(data?.content, 'span3')}
    </div>
  )
})

export default Span3
