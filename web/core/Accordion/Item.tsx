import { forwardRef } from 'react'
import { AccordionItem, AccordionItemProps as _AccordionItemProps } from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'
import { Variants } from './Accordion'

export type AccordionItemProps = {
  variant?: Variants
} & _AccordionItemProps

export const Item = forwardRef<HTMLDivElement, AccordionItemProps>(function Item(
  { variant = 'primary', children, className = '', ...rest },
  forwardedRef,
) {
  const variantClassName: Partial<Record<Variants, string>> = {
    primary: 'border-b border-grey-40 dark:border-white-100',
    secondary: '',
  }
  return (
    <AccordionItem ref={forwardedRef} {...rest} className={envisTwMerge(`${variantClassName[variant]}`, className)}>
      {children}
    </AccordionItem>
  )
})
