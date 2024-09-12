import { Icon } from '@equinor/eds-core-react'
import { add, minimize } from '@equinor/eds-icons'
import { AccordionButton, useAccordionItemState } from '@chakra-ui/react'
import { Typography, TypographyProps } from '@core/Typography'

type SimpleHeaderProps = TypographyProps

export const SimpleHeader = ({ children, ...rest }: SimpleHeaderProps) => {
  const { isOpen } = useAccordionItemState()

  return (
    <Typography as="h2" {...rest}>
      <AccordionButton
        className={
          'flex items-center focus-visible:envis-outline outline-none justify-between w-full bg-transparent py-md border-none cursor-pointer'
        }
      >
        <Typography as="span" className={`${isOpen ? 'font-bold' : 'font-normal'}`}>
          {children}
        </Typography>
        <Icon data={isOpen ? minimize : add} />
      </AccordionButton>
    </Typography>
  )
}
