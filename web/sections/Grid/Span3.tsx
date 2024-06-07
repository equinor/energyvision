import { twMerge } from 'tailwind-merge'
import { HTMLAttributes, forwardRef } from 'react'
import { mapGridContent } from './mapGridContent'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'

export type Span3Props = {
  data: any
  className?: string
} & HTMLAttributes<HTMLDivElement>

const Span3 = forwardRef<HTMLDivElement, Span3Props>(function Span3({ data, className = '', ...rest }, ref) {
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  const minHeight = data?.content?.type === 'videoPlayer' ? '' : 'min-h-[350px]'

  return (
    <div
      ref={ref}
      className={twMerge(
        `lg:col-span-3 
        w-full
        h-full
        border
        border-moss-green-60
        ${minHeight}
        `,
        className,
      )}
      {...rest}
    >
      {mapGridContent(data?.content, 'span3', isMobile)}
    </div>
  )
})

export default Span3
