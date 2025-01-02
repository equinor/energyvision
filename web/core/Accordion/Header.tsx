import { forwardRef } from 'react'
import {
  AccordionHeader,
  AccordionHeaderProps as _AccordionHeaderProps,
  AccordionTrigger,
  AccordionTriggerProps,
} from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'
import { chevron_down } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'

export type AccordionHeaderProps = {
  headerClassName?: string
  className?: string
} & _AccordionHeaderProps &
  AccordionTriggerProps

/**
 * Accordion header with trigger element
 * By default this part is rendered as a button, use asChild if you want link.
 * Remember to ensure accessibility and functionality if changing element type
 *
 * @see 🏷️ {@link AccordionHeaderProps}
 */
export const Header = forwardRef<HTMLButtonElement, AccordionHeaderProps>(function Header(
  { children, className = '', headerClassName = '', ...rest },
  ref,
) {
  return (
    <AccordionHeader className={envisTwMerge(``, headerClassName)}>
      <AccordionTrigger
        ref={ref}
        className={envisTwMerge(
          `group/trigger w-full flex justify-between border-b py-3 border-moss-green-90`,
          className,
        )}
        {...rest}
      >
        {children}
        <TransformableIcon className={'rotate-180 group-data-closed/trigger:rotate-0'} iconData={chevron_down} />
      </AccordionTrigger>
    </AccordionHeader>
  )
})
