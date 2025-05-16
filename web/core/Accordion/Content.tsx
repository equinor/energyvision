import { forwardRef } from 'react'
import { AccordionContent, AccordionContentProps as _AccordionContentProps } from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'
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
        ) : (
          <>{children}</>
        )
      case 'simpleMenu':
        return <div className="pl-4 py-6 xl:py-10">{children}</div>

      default:
        return (
          <div className="pt-0 ml-2.5 border-l border-dashed border-slate-80 dark:border-white-100 pl-7 pr-4 pb-6 mb-6 flex flex-col gap-6">
            {children}
          </div>
        )
    }
  }

  return (
    <AccordionContent
      {...rest}
      ref={ref}
      {...(variant === 'menu' &&
        useComplex && {
          asChild: true,
        })}
      className={envisTwMerge(`${variantClassName[variant]}`, className)}
    >
      {getVariantBody()}
    </AccordionContent>
  )
})
