import { forwardRef, HTMLAttributes } from 'react'

export type TextProps = {
  hasColumns?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Text = forwardRef<HTMLDivElement, TextProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <div ref={ref} className={`text-pretty`} {...rest}>
      {children}
    </div>
  )
})
