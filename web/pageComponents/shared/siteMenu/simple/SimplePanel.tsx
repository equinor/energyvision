import styled from 'styled-components'
import { AccordionPanel as RAccordionPanel, AccordionPanelProps as RAccordionPanelProps } from '@reach/accordion'

const StyledPanel = styled(RAccordionPanel)`
  background-color: var(--background-color);
  @media (min-width: 1300px) {
    max-width: 1700px;
    margin: 0 auto;
  }
`

export const SimplePanel = ({ children, ...rest }: RAccordionPanelProps) => {
  return <StyledPanel {...rest}>{children}</StyledPanel>
}
