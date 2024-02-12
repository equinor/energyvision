import { forwardRef } from 'react'
import { useDivHeight } from './hooks/useDivHeight'
import styled from 'styled-components'
import { AccordionPanel, AccordionPanelProps as ChakraAccordionPanelProps } from '@chakra-ui/react'

export type AccordionPanelProps = ChakraAccordionPanelProps

const StyledPanel = styled.div`
  padding: var(--space-small) var(--space-small) var(--space-large) 0;
  margin-left: calc(var(--space-xLarge) / 2);
  p:last-child {
    margin-bottom: 0;
  }
`
const ContentWithBorder = styled.div`
  border-left: 1px dashed var(--accordion-icon-color);
  padding-left: calc(var(--space-xLarge) / 2);
`

export const Panel = forwardRef<HTMLDivElement, AccordionPanelProps>(function Panel(
  { children, ...rest },
  forwardedRef,
) {
  const { ref } = useDivHeight()
  return (
    <AccordionPanel ref={forwardedRef} {...rest}>
      <StyledPanel ref={ref}>
        <ContentWithBorder>{children}</ContentWithBorder>
      </StyledPanel>
    </AccordionPanel>
  )
})
