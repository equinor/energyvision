import { forwardRef, HTMLAttributes } from 'react'

export type RelatedContentProps = HTMLAttributes<HTMLDivElement>

export const RelatedContent = forwardRef<HTMLDivElement, RelatedContentProps>(function RelatedContent(
  { children, ...rest },
  ref,
) {
  return (
    <div {...rest} ref={ref}>
      {children}
    </div>
  )
})
