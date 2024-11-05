import { CSSProperties, forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { AccordionContent, AccordionContentProps as _AccordionContentProps } from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'
import { mergeRefs } from '@equinor/eds-utils'

export type AccordionContentProps = _AccordionContentProps

export const Content = forwardRef<HTMLDivElement, AccordionContentProps>(function Content(
  { children, className = '', forceMount, ...rest },
  forwardedRef,
) {
  const contentRef = useRef<HTMLDivElement>(null)
  const combinedContentRef = useMemo(
    () => mergeRefs<HTMLDivElement>(contentRef, forwardedRef),
    [contentRef, forwardedRef],
  )
  const [collapsedHeight, setCollapsedHeight] = useState<number>()

  useEffect(() => {
    if (!contentRef.current) {
      return
    }
    if (contentRef.current && forceMount) {
      const currentHeight = contentRef.current.clientHeight
      const height = Math.max(collapsedHeight ?? 0, currentHeight)

      setCollapsedHeight(height)
    }
  }, [collapsedHeight, contentRef, forceMount])

  return (
    <AccordionContent
      ref={combinedContentRef}
      forceMount={forceMount}
      {...(forceMount && {
        style: {
          '--radix-collapsible-content-height': `${collapsedHeight}px`,
        } as CSSProperties,
      })}
      className={envisTwMerge(`${forceMount ? 'data-closed:hidden' : ''}`, className)}
      {...rest}
    >
      {children}
    </AccordionContent>
  )
})
