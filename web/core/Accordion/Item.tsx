import { forwardRef } from 'react'
import { AccordionItem, AccordionItemProps as _AccordionItemProps } from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'

export type AccordionItemProps = _AccordionItemProps

export const Item = forwardRef<HTMLDivElement, AccordionItemProps>(function Item(
  { children, className = '', ...rest },
  forwardedRef,
) {
  return (
    <AccordionItem ref={forwardedRef} {...rest} className={envisTwMerge(``, className)}>
      {children}
    </AccordionItem>
  )
})
