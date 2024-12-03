import { forwardRef, useMemo, useRef } from 'react'
import { AccordionContent, AccordionContentProps as _AccordionContentProps } from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'
import { mergeRefs } from '@equinor/eds-utils'
import { Variants } from './Accordion'

export type AccordionContentProps = {
  variant?: Variants
} & _AccordionContentProps

export const Content = forwardRef<HTMLDivElement, AccordionContentProps>(function Content(
  { variant = 'primary', children, className = '', ...rest },
  forwardedRef,
) {
  const contentRef = useRef<HTMLDivElement>(null)
  const combinedContentRef = useMemo(
    () => mergeRefs<HTMLDivElement>(contentRef, forwardedRef),
    [contentRef, forwardedRef],
  )

  /*   const [collapsedHeight, setCollapsedHeight] = useState<number>()
  useEffect(() => {
    if (!contentRef.current) {
      return
    }
    if (contentRef.current && forceMount) {
      const currentHeight = contentRef.current.clientHeight
      const height = Math.max(collapsedHeight ?? 0, currentHeight)
      setCollapsedHeight(height)
    }
  }, [collapsedHeight, contentRef, forceMount]) */

  const variantClassName: Partial<Record<Variants, string>> = {
    primary: '',
    secondary: '',
  }

  /**
  * pt-0 
         ml-2.5
         border-l
         border-dashed
         border-energy-red-100
         pl-7
         pr-4
         pb-6
         mb-6
         [&p]:last:mb-0
         flex
         flex-col
         gap-6
  */

  const getVariantBody = () => {
    switch (variant) {
      case 'primary':
        return (
          <div
            className={`pt-0 
         ml-2.5
         border-l
         border-dashed
         border-energy-red-100
         pl-7
         pr-4
         pb-6
         mb-6
         flex
         flex-col
         gap-6`}
          >
            {children}
          </div>
        )

      default:
        return <>{children}</>
    }
  }

  return (
    <AccordionContent
      ref={combinedContentRef}
      /*       forceMount={forceMount} */
      /*       {...(forceMount && {
        style: {
          '--radix-collapsible-content-height': `${height}px`,
        } as CSSProperties,
      })} 
        
              motion-safe:data-open:animate-slideUp
        motion-safe:data-closed:animate-slideDown
      */
      className={envisTwMerge(
        `overflow-hidden
        motion-safe:data-closed:animate-slideDown
        motion-safe:data-open:animate-slideUp
        ${variantClassName[variant]}`,
        className,
      )}
      {...rest}
    >
      {getVariantBody()}
    </AccordionContent>
  )
})
