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
    position: fixed;
    left: 0;
    right: 0;
    background-color: var(--ui-background-default);
    max-height: var(--menu-height-lg);
    height: var(--menu-height-lg);
    padding: var(--space-medium) 0;
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
      {children}
    </StyledPanel>
  )
})
