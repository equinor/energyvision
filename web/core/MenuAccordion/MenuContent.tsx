import { forwardRef } from 'react'
import { AccordionContent, AccordionContentProps } from '@radix-ui/react-accordion'
import envisTwMerge from '../../twMerge'

export type MenuContentProps = AccordionContentProps

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(function SubMenuPanel(
  { className = '', children, ...rest },
  ref,
) {
  return (
    <AccordionContent
      ref={ref}
      className={envisTwMerge(
        `bg-white-100 xl:absolute xl:left-0 xl:right-0 py-6 max-w-[1700px] mx-auto top:265px`,
        className,
      )}
      {...rest}
    >
      <div className="pb-10 xl:px-16">{children}</div>
    </AccordionContent>
  )
})
