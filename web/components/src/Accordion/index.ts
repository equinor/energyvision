import {
  Accordion as AccordionWrapper,
  AccordionProps,
  Header,
  Item,
  Panel,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionPanelProps,
} from './Accordion'

type AccordionCompoundProps = typeof AccordionWrapper & {
  Item: typeof Item
  Header: typeof Header
  Panel: typeof Panel
}

const Accordion = AccordionWrapper as AccordionCompoundProps

Accordion.Item = Item
Accordion.Header = Header
Accordion.Panel = Panel

export { Accordion }
export type { AccordionProps, AccordionHeaderProps, AccordionItemProps, AccordionPanelProps }
