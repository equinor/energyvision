import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { AccordionPanel as RAccordionPanel, AccordionPanelProps as RAccordionPanelProps } from '@reach/accordion'

const StyledPanel = styled(RAccordionPanel)`
  background-color: var(--background-color);
  @media (min-width: 1300px) {
    position: absolute;
    left: 0;
    right: 0;
    background-color: var(--ui-background-default);
    padding: var(--space-medium) 0;
    /* @TODO: Find a nice value */
    max-width: 1700px;
    margin: 0 auto;
  }
`

const PanelContainer = styled.div`
  padding-bottom: var(--space-xLarge);
  @media (min-width: 1300px) {
    padding: 0 var(--space-3xLarge);
  }
`
export type SubMenuPanelProps = RAccordionPanelProps & HTMLAttributes<HTMLDivElement>

export const SubMenuPanel = forwardRef<HTMLDivElement, SubMenuPanelProps>(function SubMenuPanel(
  { children, ...rest },
  ref,
) {
  return (
    <StyledPanel ref={ref} {...rest}>
      <PanelContainer>{children}</PanelContainer>
    </StyledPanel>
  )
})
