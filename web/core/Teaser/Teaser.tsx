import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type ImageSize = 'small' | 'full'
export type ImagePosition = 'left' | 'right'

export const Teaser = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Teaser(
  { children, className },
  ref,
) {
  return (
    <article className={className} ref={ref}>
      <div className={`overflow-y-hidden max-w-[1440px] grid md:grid-cols-2 auto-rows-min my-0 mx-auto `}>
        {children}
      </div>
    </article>
  )
})
