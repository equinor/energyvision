import { forwardRef, HTMLAttributes } from 'react'
export type AttributionProps = HTMLAttributes<HTMLDivElement>

export const Attribution = forwardRef<HTMLDivElement, AttributionProps>(function ({ children, ...rest }, ref) {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  )
})
