import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import {
  Accordion as RAccordion,
  AccordionItem as RAccordionItem,
  AccordionButton as RAccordionButton,
  AccordionPanel as RAccordionPanel,
  AccordionProps as RAccordionProps,
  AccordionItemProps as RAccordionItemProps,
  AccordionButtonProps as RAccordionButtonProps,
  AccordionPanelProps as RAccordionPanelProps,
} from '@reach/accordion'

export type AccordionProps = RAccordionProps

export type AccordionItemProps = RAccordionItemProps
export type AccordionHeaderProps = RAccordionButtonProps
export type AccordionPanelProps = RAccordionPanelProps

export const Accordion = ({ children, ...rest }: AccordionProps) => {
  return <RAccordion {...rest}>{children}</RAccordion>
}

export const Item = forwardRef<HTMLDivElement, RAccordionItemProps>(function Item({ children, ...rest }, ref) {
  return (
    <RAccordionItem ref={ref} {...rest}>
      {children}
    </RAccordionItem>
  )
})
export const Header = forwardRef<HTMLButtonElement, RAccordionButtonProps>(function Header({ children, ...rest }, ref) {
  return (
    <RAccordionButton ref={ref} {...rest}>
      {children}
    </RAccordionButton>
  )
})

export const Panel = forwardRef<HTMLDivElement, RAccordionPanelProps>(function Panel({ children, ...rest }, ref) {
  return (
    <RAccordionPanel ref={ref} {...rest}>
      {children}
    </RAccordionPanel>
  )
})
