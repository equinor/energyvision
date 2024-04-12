import { forwardRef, HTMLAttributes } from 'react'

export type CaptionProps = HTMLAttributes<HTMLDivElement>

export const Caption = forwardRef<HTMLDivElement, CaptionProps>(function ({ children, ...rest }, ref) {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  )
})
