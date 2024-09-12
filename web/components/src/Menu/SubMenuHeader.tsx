import { forwardRef } from 'react'
import { AccordionButton, useAccordionItemState, AccordionButtonProps } from '@chakra-ui/react'
import { Icon } from '@equinor/eds-core-react'
import { add, minimize } from '@equinor/eds-icons'
import { Typography } from '@core/Typography'

export type SubMenuHeaderProps = AccordionButtonProps

export const SubMenuHeader = forwardRef<HTMLButtonElement, SubMenuHeaderProps>(function SubMenuHeader(
  { children },
  ref,
) {
  const { isOpen } = useAccordionItemState()
  const border = isOpen ? 'xl:border-b-moss-green-95' : 'xl:border-b-transparent'

  return (
    <Typography
      variant="h2"
      value={children}
      className={`${border} py-0 xl:hover:bg-[var(--moss-green-70)] xl:border-solid xl:border-b-2`}
    >
      <AccordionButton
        className={` border-0 flex items-center justify-between w-full bg-transparent py-md border-none cursor-pointer text-default-text outline-none focus-visible:envis-outline xl:py-sm xl:px-xs+sm`}
        ref={ref}
      >
        <Typography as="span" className={`${isOpen ? 'font-bold' : 'font-normal'} xl:font-normal`}>
          {children}
        </Typography>
        <Icon data={isOpen ? minimize : add} className="xl:hidden" />
      </AccordionButton>
    </Typography>
  )
})
