import styled from 'styled-components'
import { Accordion as RAccordion, AccordionProps as RAccordionProps } from '@reach/accordion'
import { Accordion as CAccordion, AccordionProps as ChakraAccordionProps } from '@chakra-ui/react'
import { Flags } from '../../../../common/helpers/datasetHelpers'

export type MenuProps = RAccordionProps & ChakraAccordionProps

const ChakraStyledAccordion = styled(CAccordion)`
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 700px) {
    margin: 0 auto;
    max-width: var(--layout-maxContent-narrow);
  }
`
const StyledAccordion = styled(RAccordion)`
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 700px) {
    margin: 0 auto;
    max-width: var(--layout-maxContent-narrow);
  }
`

export const SimpleMenuWrapper = ({ children, ...rest }: MenuProps) => {
  return (
    <>
      {Flags.IS_DEV ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: @TODO: Lets look into this at some point
        <ChakraStyledAccordion forwardedAs="ul" {...rest} id="menu-accordion">
          {children}
        </ChakraStyledAccordion>
      ) : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: @TODO: Lets look into this at some point
        <StyledAccordion forwardedAs="ul" {...rest} id="menu-accordion">
          {children}
        </StyledAccordion>
      )}
    </>
  )
}
