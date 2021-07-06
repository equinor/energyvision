import { Accordion as AccordionWrapper, AccordionProps } from './Accordion'
import { Panel, AccordionPanelProps } from './Panel'
import { Item, AccordionItemProps } from './Item'
import { Header, AccordionHeaderProps } from './Header'

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
