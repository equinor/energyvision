import { forwardRef, HTMLAttributes } from 'react'

export type TeaserContentProps = HTMLAttributes<HTMLDivElement>

export const Content = forwardRef<HTMLDivElement, TeaserContentProps>(function Content({ children, ...rest }, ref) {
  return (
    <div className="items-center content-start py-12 [&>p]:pb-0 [&>ul]:mb-6 px-8" ref={ref} {...rest}>
      {children}
    </div>
  )
})
