import styled from 'styled-components'
import { AccordionPanel, AccordionPanelProps as ChakraAccordionPanelProps } from '@chakra-ui/react'

const StyledPanel = styled(AccordionPanel)`
  background-color: var(--background-color);
  @media (min-width: 1300px) {
    max-width: 1700px;
    margin: 0 auto;
  }
`

export type AccordionPanelProps = ChakraAccordionPanelProps

export const SimplePanel = ({ children, ...rest }: AccordionPanelProps) => {
  return <StyledPanel {...rest}>{children}</StyledPanel>
}
