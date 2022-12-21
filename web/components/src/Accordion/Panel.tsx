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
import { AccordionPanel as CAccordionPanel, AccordionPanelProps as ChakraAccordionPanelProps } from '@chakra-ui/react'
import { Flags } from '../../../common/helpers/datasetHelpers'

export type AccordionPanelProps = {
  animate?: boolean
} & RAccordionPanelProps

export type CAccordionPanelProps = {
  children?: React.ReactNode
  animate?: boolean
} & ChakraAccordionPanelProps

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

export const Panel = Flags.IS_DEV
  ? forwardRef<HTMLDivElement, CAccordionPanelProps>(function Panel(
      { children, animate = true, ...rest },
      forwardedRef,
    ) {
      const { ref } = useDivHeight()
      return (
        <CAccordionPanel ref={forwardedRef} {...rest}>
          <StyledPanel ref={ref}>
            <ContentWithBorder>{children}</ContentWithBorder>
          </StyledPanel>
        </CAccordionPanel>
      )
    })
  : forwardRef<HTMLDivElement, AccordionPanelProps>(function Panel(
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
