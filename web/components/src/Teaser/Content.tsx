import { forwardRef, HTMLAttributes } from 'react'

export type TeaserContentProps = HTMLAttributes<HTMLDivElement>

export const Content = forwardRef<HTMLDivElement, TeaserContentProps>(function Content({ children, ...rest }, ref) {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  )
})
