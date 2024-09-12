import { Icon } from '@equinor/eds-core-react'
import { chevron_down, chevron_up } from '@equinor/eds-icons'
import { AccordionButton, useAccordionItemState } from '@chakra-ui/react'
import { Typography } from '@core/Typography'

const FilterHeader = ({ label }: { label: string }) => {
  const { isOpen } = useAccordionItemState()
  const iconSize = 24
  return (
    <AccordionButton className="flex items-center focus-visible:envis-outline justify-between w-full bg-transparent py-sm px-lg  border-b border-slate-blue-50 border-b-solid cursor-pointer">
      <Typography as="span" className="pt-[var(--space-2)]">
        {label}
      </Typography>
      <Icon size={iconSize} data={isOpen ? chevron_up : chevron_down} />
    </AccordionButton>
  )
}

export default FilterHeader
