import { forwardRef } from 'react'
import { Icon } from '@equinor/eds-core-react'
import { Typography } from '@core/Typography'
import { add_circle_outlined, remove_outlined, add_circle_filled, remove } from '@equinor/eds-icons'

import {
  AccordionButton,
  useAccordionItemState,
  AccordionButtonProps as ChakraAccordionButtonProps,
} from '@chakra-ui/react'

export type AccordionHeaderProps = {
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5'
} & ChakraAccordionButtonProps

export const Header = forwardRef<HTMLButtonElement, AccordionHeaderProps>(function Header(
  { headingLevel = 'h3', children, ...rest },
  ref,
) {
  const iconSize = 24
  const { isOpen } = useAccordionItemState()
  const fillColor = `fill-[var(--accordion-icon-color)]`

  return (
    <Typography as={headingLevel}>
      <AccordionButton
        ref={ref}
        className="flex items-center w-full bg-transparent sm:py-6 border-none cursor-pointer focus-visible:envis-outline"
        {...rest}
      >
        <span className="leading-[16px] flex-[0_0_var(--space-xLarge)]">
          <Icon
            className={`${fillColor} ${isOpen ? '!hidden' : 'hover:!inline'}`}
            size={iconSize}
            data={isOpen ? remove_outlined : add_circle_outlined}
          />
          <Icon
            className={`${fillColor} ${isOpen ? 'hover:!inline' : '!hidden'}`}
            size={iconSize}
            data={isOpen ? remove : add_circle_filled}
          />
        </span>
        <Typography
          as="span"
          className={`motion-safe:transition-[font-weight] motion-safe:duration-100 motion-safe:ease-in-out ${
            isOpen ? 'font-bold' : 'font-normal'
          } pt-[var(--space-2)] leading-earthy`}
        >
          {children}
        </Typography>
      </AccordionButton>
    </Typography>
  )
})
