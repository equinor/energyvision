'use client'
import { forwardRef } from 'react'
import { AccordionContent, AccordionContentProps as _AccordionContentProps } from '@radix-ui/react-accordion'
import { Variants } from './Accordion'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { twMerge } from 'tailwind-merge'

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
  const useComplex = useMediaQuery(`(min-width: 1300px)`)

  const commonSlideUpDown = `overflow-hidden motion-safe:data-closed:animate-slideDown motion-safe:data-open:animate-slideUp`

  const variantClassName: Partial<Record<Variants, string>> = {
    primary: `${commonSlideUpDown}`,
    menu: `max-xl:overflow-hidden
    max-xl:motion-safe:data-closed:animate-slideDown
    max-xl:motion-safe:data-open:animate-slideUp

    `,
    simpleMenu: `max-xl:overflow-hidden
    max-xl:motion-safe:data-closed:animate-slideDown
    max-xl:motion-safe:data-open:animate-slideUp`,
  }

  const getVariantBody = () => {
    switch (variant) {
      case 'menu':
        return useComplex ? (
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
              transition={{ duration: 0.3 }}
              className="absolute top-[260px] right-0 left-0 mx-auto bg-white-100"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        ) : (
          <>{children}</>
        )
      case 'simpleMenu':
        return <div className="py-6 pl-4 xl:py-10">{children}</div>

      default:
        return (
          <div className="mb-6 ml-2.5 flex flex-col gap-6 border-l border-dashed border-slate-80 pt-0 pr-4 pb-6 pl-7 dark:border-white-100">
            {children}
          </div>
        )
    }
  }

  return (
    <AccordionContent
      {...rest}
      ref={ref}
      className={twMerge(`${variantClassName[variant]}`, className)}
    >
      {getVariantBody()}
    </AccordionContent>
  )
})
