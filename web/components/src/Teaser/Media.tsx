import { forwardRef, HTMLAttributes } from 'react'

export type TeaserMediaProps = HTMLAttributes<HTMLDivElement>

export const Media = forwardRef<HTMLDivElement, TeaserMediaProps>(function Media({ children, ...rest }, ref) {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  )
})
