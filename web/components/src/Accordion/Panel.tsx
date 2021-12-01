import { forwardRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useDivHeight } from './hooks/useDivHeight'
import {
  AccordionPanel as RAccordionPanel,
  AccordionPanelProps as RAccordionPanelProps,
  useAccordionItemContext,
} from '@reach/accordion'
import styled from 'styled-components'

export type AccordionPanelProps = {
  animate?: boolean
} & RAccordionPanelProps

const AnimatedAccordionPanel = animated(RAccordionPanel)

const StyledPanel = styled.div`
  padding: var(--space-small) var(--space-small) var(--space-large) 0;
  margin-left: calc(var(--space-xLarge) / 2);
  p:last-child {
    margin-bottom: 0;
  }
`
const ContentWithBorder = styled.div`
  border-left: 1px dashed var(--energy-red-100);
  padding-left: calc(var(--space-xLarge) / 2);
`

export const Panel = forwardRef<HTMLDivElement, AccordionPanelProps>(function Panel(
  { animate = true, children, ...rest },
  forwardedRef,
) {
  const { isExpanded } = useAccordionItemContext()
  const { ref, height } = useDivHeight()
  const prefersReducedMotion = usePrefersReducedMotion()
  const animation = useSpring({
    opacity: isExpanded ? 1 : 0,
    height: isExpanded ? height : 0,
    overflow: 'hidden',
    config: { duration: 150 },
    immediate: prefersReducedMotion || !animate,
  })

  return (
    <AnimatedAccordionPanel
      style={animation}
      hidden={false}
      aria-hidden={!isExpanded || undefined}
      ref={forwardedRef}
      {...rest}
    >
      <StyledPanel ref={ref}>
        <ContentWithBorder>{children}</ContentWithBorder>
      </StyledPanel>
    </AnimatedAccordionPanel>
  )
})
