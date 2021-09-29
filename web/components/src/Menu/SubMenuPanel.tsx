import { forwardRef } from 'react'
import styled from 'styled-components'
import { AccordionPanel as RAccordionPanel, AccordionPanelProps as RAccordionPanelProps } from '@reach/accordion'

const StyledPanel = styled(RAccordionPanel)`
  border-bottom: 1px solid var(--grey-40);
`
export type SubMenuPanelProps = RAccordionPanelProps

export const SubMenuPanel = forwardRef<HTMLDivElement, RAccordionPanelProps>(function SubMenuPanel(
  { children, ...rest },
  ref,
) {
  return (
    <StyledPanel ref={ref} {...rest}>
      {children}
    </StyledPanel>
  )
})
