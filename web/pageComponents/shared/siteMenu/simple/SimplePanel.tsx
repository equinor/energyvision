import styled from 'styled-components'
import { AccordionPanel as RAccordionPanel, AccordionPanelProps as RAccordionPanelProps } from '@reach/accordion'
import { AccordionPanel as CAccordionPanel, AccordionPanelProps as ChakraAccordionPanelProps } from '@chakra-ui/react'
import { Flags } from '../../../../common/helpers/datasetHelpers'

const ChakraStyledPanel = styled(CAccordionPanel)`
  background-color: var(--background-color);
  @media (min-width: 1300px) {
    max-width: 1700px;
    margin: 0 auto;
  }
`

const StyledPanel = styled(RAccordionPanel)`
  background-color: var(--background-color);
  @media (min-width: 1300px) {
    max-width: 1700px;
    margin: 0 auto;
  }
`

export type AccordionPanelProps = ChakraAccordionPanelProps & RAccordionPanelProps

export const SimplePanel = ({ children, ...rest }: AccordionPanelProps) => {
  return (
    <>
      {Flags.IS_DEV ? (
        <ChakraStyledPanel {...rest}>{children}</ChakraStyledPanel>
      ) : (
        <StyledPanel {...rest}>{children}</StyledPanel>
      )}
    </>
  )
}
