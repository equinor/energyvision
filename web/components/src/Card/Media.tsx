import { forwardRef, HTMLAttributes } from 'react'

export type CardMediaProps = HTMLAttributes<HTMLDivElement>

export const Media = forwardRef<HTMLDivElement, CardMediaProps>(function Media({ children, ...rest }, ref) {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  )
})
