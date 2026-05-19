import {
  type AccordionMultipleProps,
  type AccordionSingleProps,
  Accordion as AccordionWrapper,
} from './Accordion'
import { type AccordionContentProps, Content } from './Content'
import { type AccordionHeaderProps, Header } from './Header'
import { type AccordionItemProps, Item } from './Item'

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
export type {
  AccordionSingleProps,
  AccordionMultipleProps,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionContentProps,
}
