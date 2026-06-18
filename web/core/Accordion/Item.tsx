import { forwardRef } from 'react'
import { AccordionItem, AccordionItemProps as _AccordionItemProps } from '@radix-ui/react-accordion'
import { Variants } from './Accordion'
import { twMerge } from 'tailwind-merge'

export type AccordionItemProps = {
  variant?: Variants
} & _AccordionItemProps

export const Item = forwardRef<HTMLDivElement, AccordionItemProps>(function Item(
  { variant = 'primary', children, value, className = '' },
  forwardedRef,
) {
  const variantClassName: Partial<Record<Variants, string>> = {
    primary: 'border-b border-grey-40 dark:border-white-100',
    menu: '',
    simpleMenu: '',
  }
  return (
    <AccordionItem ref={forwardedRef} value={value} className={twMerge(`${variantClassName[variant]}`, className)}>
      {children}
    </AccordionItem>
  )
})
