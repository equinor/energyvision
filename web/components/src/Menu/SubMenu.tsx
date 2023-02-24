import styled from 'styled-components'
import { AccordionItem as CAccordionItem } from '@chakra-ui/react'
import { AccordionItem as RAccordionItem, AccordionItemProps as RAccordionItemProps } from '@reach/accordion'
import { Flags } from '../../../common/helpers/datasetHelpers'

const ChakraStyledItem = styled(CAccordionItem)`
  border-bottom: 1px solid var(--grey-20);
  @media (min-width: 1300px) {
    border: 0;
  }
`
const StyledItem = styled(RAccordionItem)`
  border-bottom: 1px solid var(--grey-20);
  @media (min-width: 1300px) {
    border: 0;
  }
`

export type SubMenuProps = {
  id: number
  children: React.ReactNode
} & RAccordionItemProps

export const SubMenu = ({ id, children, ...rest }: SubMenuProps) => {
  return (
    <>
      {Flags.IS_DEV ? (
        <ChakraStyledItem forwardedAs="li" {...rest} index={id}>
          {children}
        </ChakraStyledItem>
      ) : (
        <StyledItem forwardedAs="li" {...rest} index={id}>
          {children}
        </StyledItem>
      )}
    </>
  )
}
