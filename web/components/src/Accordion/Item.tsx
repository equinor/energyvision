import { AccordionItem } from '@chakra-ui/react'

export type AccordionItemProps = {
  id: number
  children: React.ReactNode
}

export const Item = ({ id, children, ...rest }: AccordionItemProps) => {
  return (
    <AccordionItem style={{borderBottom: '1px solid var(--grey-40)'}}{...rest} key={id}>
      {children}
    </AccordionItem>
  )
}
