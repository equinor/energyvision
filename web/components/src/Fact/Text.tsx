import { forwardRef, HTMLAttributes } from 'react'

export type TextProps = {
  hasColumns?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Text = forwardRef<HTMLDivElement, TextProps>(function CardMedia(
  { children, hasColumns = false, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`${hasColumns ? 'lg:text-justify text-pretty' : 'lg:text-justify text-pretty'}`}
      {...rest}
    >
      {children}
    </div>
  )
})
