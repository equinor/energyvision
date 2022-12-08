import styled from 'styled-components'
import { AccordionItem as RAccordionItem, AccordionItemProps as RAccordionItemProps } from '@reach/accordion'
import { AccordionItem as CAccordionItem } from '@chakra-ui/react'
import { Flags } from '../../../common/helpers/datasetHelpers'

const StyledItem = styled(RAccordionItem)`
  border-bottom: 1px solid var(--grey-40);
`
const CStyledItem = styled(CAccordionItem)`
  border-bottom: 1px solid var(--grey-40);
`

export type AccordionItemProps = RAccordionItemProps & {
  id: number
}

export type CAccordionItemProps = {
  id: number
  children: React.ReactNode 
}

export const Item = Flags.IS_DEV
  ? ({ id, children, ...rest }: CAccordionItemProps) => {
      return (
        <CStyledItem {...rest} index={id}>
          {children}
        </CStyledItem>
      )
    }
  : ({ id, children, ...rest }: AccordionItemProps) => {
      return (
        <StyledItem {...rest} index={id}>
          {children}
        </StyledItem>
      )
    }
