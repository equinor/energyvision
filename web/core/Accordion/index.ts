import { Accordion as AccordionWrapper, AccordionProps } from './Accordion'
import { Item, AccordionItemProps } from './Item'
import { Content, AccordionContentProps } from './Content'
import { Header, AccordionHeaderProps } from './Header'

type AccordionCompoundProps = typeof AccordionWrapper & {
  Item: typeof Item
  Header: typeof Header
  Content: typeof Content
}

const Accordion = AccordionWrapper as AccordionCompoundProps

Accordion.Item = Item
Accordion.Header = Header
Accordion.Content = Content

export { Accordion }
export type { AccordionProps, AccordionHeaderProps, AccordionItemProps, AccordionContentProps }
