import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'
import {
  AccordionPanel as RAccordionPanel,
  AccordionPanelProps as RAccordionPanelProps,
  useAccordionItemContext,
} from '@reach/accordion'

const StyledPanel = styled(RAccordionPanel)`
  border-bottom: 1px solid var(--grey-40);
  background-color: var(--background-color);
  @media (min-width: 1300px) {
    position: absolute;
    top: 265px;
    left: 0;
    right: 0;
    background-color: var(--ui-background-default);
    padding: var(--space-medium) 0;
    border-bottom: transparent;
    /* @TODO: Find a nice value */
    max-width: 1700px;
    margin: 0 auto;
  }
`

const PanelContainer = styled.div`
  @media (min-width: 1300px) {
    padding: 0 var(--space-3xLarge);
  }
`
export type SubMenuPanelProps = RAccordionPanelProps & HTMLAttributes<HTMLDivElement>

export const SubMenuPanel = forwardRef<HTMLDivElement, SubMenuPanelProps>(function SubMenuPanel(
  { children, style, ...rest },
  ref,
) {
  const context = useAccordionItemContext()
  const isExpanded = context.isExpanded

  return (
    <StyledPanel
      style={
        {
          ...style,
          '--background-color': isExpanded ? 'var(--grey-10)' : 'var(--ui-background-default)',
        } as CSSProperties
      }
      ref={ref}
      {...rest}
    >
      <PanelContainer>{children}</PanelContainer>
    </StyledPanel>
  )
})
