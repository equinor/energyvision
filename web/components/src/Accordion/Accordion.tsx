import { forwardRef, HTMLAttributes } from 'react'
import { Accordion as EdsAccordion } from '@equinor/eds-core-react'
import styled from 'styled-components'

const { Item: EdsItem, Header: EdsHeader, HeaderTitle: EdsHeaderTitle, Panel: EdsPanel } = EdsAccordion

export type AccordionProps = HTMLAttributes<HTMLDivElement>
export type AccordionItemProps = HTMLAttributes<HTMLDivElement>
export type AccordionHeaderProps = HTMLAttributes<HTMLDivElement>
export type AccordionHeaderTitleProps = HTMLAttributes<HTMLDivElement>
export type AccordionPanelProps = HTMLAttributes<HTMLDivElement>

export const StyledAccordion = styled(EdsAccordion)``

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion({ children, ...rest }, ref) {
  return (
    <StyledAccordion chevronPosition="right" ref={ref} {...rest}>
      {children}
    </StyledAccordion>
  )
})

export const Item = forwardRef<HTMLDivElement, AccordionItemProps>(function Item({ children, ...rest }, ref) {
  return (
    <EdsItem ref={ref} {...rest}>
      {children}
    </EdsItem>
  )
})
export const Header = forwardRef<HTMLDivElement, AccordionHeaderProps>(function Header({ children, ...rest }, ref) {
  return (
    <EdsHeader ref={ref} {...rest}>
      {children}
    </EdsHeader>
  )
})
export const HeaderTitle = forwardRef<HTMLDivElement, AccordionHeaderTitleProps>(function HeaderTitle(
  { children, ...rest },
  ref,
) {
  return (
    <EdsHeaderTitle ref={ref} {...rest}>
      {children}
    </EdsHeaderTitle>
  )
})
export const Panel = forwardRef<HTMLDivElement, AccordionPanelProps>(function Panel({ children, ...rest }, ref) {
  return (
    <EdsPanel ref={ref} {...rest}>
      {children}
    </EdsPanel>
  )
})
