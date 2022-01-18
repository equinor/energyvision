import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { AccordionPanel as RAccordionPanel, AccordionPanelProps as RAccordionPanelProps } from '@reach/accordion'

const StyledPanel = styled(RAccordionPanel)`
  background-color: var(--background-color);
  @media (min-width: 1300px) {
    max-width: 1700px;
    margin: 0 auto;
  }
`

const PanelContainer = styled.div``
export type SimplePanelProps = RAccordionPanelProps & HTMLAttributes<HTMLDivElement>

export const SimplePanel = forwardRef<HTMLDivElement, SimplePanelProps>(function SubMenuPanel(
  { children, ...rest },
  ref,
) {
  return (
    <StyledPanel ref={ref} {...rest}>
      <PanelContainer>{children}</PanelContainer>
    </StyledPanel>
  )
})
