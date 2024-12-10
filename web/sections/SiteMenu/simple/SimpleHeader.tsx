import { Icon } from '@equinor/eds-core-react'
import { add, minimize } from '@equinor/eds-icons'
import { Typography, TypographyProps } from '@core/Typography'
import { Accordion } from '@core/Accordion'

type SimpleHeaderProps = TypographyProps

export const SimpleHeader = ({ children, ...rest }: SimpleHeaderProps) => {
  return (
    <Typography as="h2" {...rest}>
      <Accordion.Header
        className="group 
        flex 
        items-center 
        focus-visible:envis-outline 
        outline-none 
        justify-between 
        w-full 
        bg-transparent 
        py-md 
        border-none 
        cursor-pointer"
      >
        <Typography as="span" className="font-normal group-open:font-bold">
          {children}
        </Typography>
        <Icon data={minimize} className="hidden group-open:block" />
        <Icon data={add} className="group-open:hidden" />
      </Accordion.Header>
    </Typography>
  )
}
