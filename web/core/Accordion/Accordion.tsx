import { forwardRef } from 'react'
import * as _Accordion from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'

interface AccordionSingleProps extends _Accordion.AccordionSingleProps {
  type: 'single'
}
interface AccordionMultipleProps extends _Accordion.AccordionMultipleProps {
  type: 'multiple'
}

export type Variants = 'primary' | 'secondary' | 'plain'

export type AccordionProps = {
  className?: string
} & (AccordionSingleProps | AccordionMultipleProps)

/**
 * Accordion
 *
 *
 * @see 🏷️ {@link AccordionProps}
 *
 * @example
 * ```jsx
 * <Accordion>
 *   <Accordion.Item>
 *     <Accordion.Header>Section 1</Accordion.Header>
 *     <Accordion.Content>Content 1</Accordion.Content>
 *   </Accordion.Item>
 *   <Accordion.Item>
 *     <Accordion.Header>Section 2</Accordion.Header>
 *     <Accordion.Content>Content 2</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */
export const Accordion = forwardRef<React.ElementRef<typeof _Accordion.Root>, AccordionProps>(function Accordion(
  { id, children, type = 'single', className = '', ...rest },
  ref,
) {
  const props = type === 'single' ? (rest as AccordionSingleProps) : (rest as AccordionMultipleProps)
  return (
    //@ts-ignore: TODO solve type casting
    <_Accordion.Root type={type} ref={ref} id={id} className={envisTwMerge(``, className)} {...props}>
      {children}
    </_Accordion.Root>
  )
})
