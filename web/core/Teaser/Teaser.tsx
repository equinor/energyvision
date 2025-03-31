import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type ImageSize = 'small' | 'full'

export const Teaser = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(function Teaser(
  { children, className, ...rest },
  ref,
) {
  return (
    <article
      className={twMerge(`overflow-y-hidden max-w-[1440px] grid md:grid-cols-2 auto-rows-min my-0 mx-auto `, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </article>
  )
})
