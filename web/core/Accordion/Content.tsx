import { forwardRef, useMemo, useRef } from 'react'
import { AccordionContent, AccordionContentProps as _AccordionContentProps } from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'
import { mergeRefs } from '@equinor/eds-utils'
import { Variants } from './Accordion'
import { motion } from 'framer-motion'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export type AccordionContentProps = {
  variant?: Variants
} & _AccordionContentProps

export const Content = forwardRef<HTMLDivElement, AccordionContentProps>(function Content(
  { variant = 'primary', children, className = '', ...rest },
  ref,
) {
  /*   const contentRef = useRef<HTMLDivElement>(null)
  const combinedContentRef = useMemo(
    () => mergeRefs<HTMLDivElement>(contentRef, forwardedRef),
    [contentRef, forwardedRef],
  ) */
  const isMobile = useMediaQuery(`(max-width: 800px)`)

  const commonSlideUpDown = `overflow-hidden motion-safe:data-closed:animate-slideDown motion-safe:data-open:animate-slideUp`

  const variantClassName: Partial<Record<Variants, string>> = {
    primary: `${commonSlideUpDown}`,
    secondary: `${commonSlideUpDown}`,
    menu: `
    max-lg:overflow-hidden
    max-lg:motion-safe:data-closed:animate-slideDown
    max-lg:motion-safe:data-open:animate-slideUp
    `,
    plain: '',
  }

  /**
   *     
   *     motion-safe:data-open:xl:animate-fadeIn
    motion-safe:data-closed:xl:animate-fadeOut
   * xl:absolute
    xl:left-0
    xl:top-[260px]
    xl:right-0

    xl:transition-visibility
    xl:duration-300
    xl:ease-in-out
    overflow-hidden
   */

  const getVariantBody = () => {
    switch (variant) {
      case 'primary':
        return (
          <div className="pt-0 ml-2.5 border-l border-dashed border-energy-red-100 pl-7 pr-4 pb-6 mb-6 flex flex-col gap-6">
            {children}
          </div>
        )
      case 'menu':
        return isMobile ? (
          <>{children}</>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-viewport bg-white-100 absolute left-0 top-[260px] right-0"
          >
            {children}
          </motion.div>
        )

      default:
        return <>{children}</>
    }
  }

  return (
    <AccordionContent
      {...rest}
      ref={ref}
      {...(variant === 'menu' &&
        !isMobile && {
          asChild: true,
        })}
      className={envisTwMerge(`${variantClassName[variant]}`, className)}
    >
      {getVariantBody()}
    </AccordionContent>
  )
})
