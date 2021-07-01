import {
  Accordion as AccordionWrapper,
  AccordionProps,
  HeaderTitle,
  Header,
  Item,
  Panel,
  AccordionHeaderProps,
  AccordionHeaderTitleProps,
  AccordionItemProps,
  AccordionPanelProps,
} from './Accordion'

type AccordionCompoundProps = typeof AccordionWrapper & {
  Item: typeof Item
  Header: typeof Header
  HeaderTitle: typeof HeaderTitle
  Panel: typeof Panel
}

const Accordion = AccordionWrapper as AccordionCompoundProps

Accordion.Item = Item
Accordion.Header = Header
Accordion.HeaderTitle = HeaderTitle
Accordion.Panel = Panel

export { Accordion }
export type { AccordionProps, AccordionHeaderProps, AccordionHeaderTitleProps, AccordionItemProps, AccordionPanelProps }
