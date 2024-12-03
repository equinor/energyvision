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

  const variantClassName: Partial<Record<Variants, string>> = {
    primary: 'motion-safe:data-closed:animate-slideDown motion-safe:data-open:animate-slideUp',
    secondary: 'motion-safe:data-closed:animate-slideDown motion-safe:data-open:animate-slideUp',
    plain: '',
  }

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
      className={envisTwMerge(
        `overflow-hidden

        ${variantClassName[variant]}`,
        className,
      )}
      {...rest}
    >
      {getVariantBody()}
    </AccordionContent>
  )
})
