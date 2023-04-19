import styled from 'styled-components'
import { AccordionItem } from '@chakra-ui/react'

const StyledItem = styled(AccordionItem)`
  border-bottom: 1px solid var(--grey-40);
`
export type AccordionItemProps = {
  id: number
  children: React.ReactNode
}

export const Item = ({ id, children, ...rest }: AccordionItemProps) => {
  return (
    <StyledItem {...rest} index={id}>
      {children}
    </StyledItem>
  )
}
