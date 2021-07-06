import { forwardRef, useRef, useState, useEffect } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import {
  AccordionPanel as RAccordionPanel,
  AccordionPanelProps as RAccordionPanelProps,
  useAccordionItemContext,
} from '@reach/accordion'
import styled from 'styled-components'

function useDivHeight() {
  const ref = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      requestAnimationFrame(() => {
        if (!entry) {
          return
        }
        setHeight(entry.target.getBoundingClientRect().height)
      })
    })

    if (ref.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Do you have any suggestions here Sven
      resizeObserver.observe(ref.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return { ref, height }
}

export type AccordionPanelProps = RAccordionPanelProps

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

export const Panel = forwardRef<HTMLDivElement, RAccordionPanelProps>(function Panel(
  { children, ...rest },
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
    immediate: prefersReducedMotion,
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
