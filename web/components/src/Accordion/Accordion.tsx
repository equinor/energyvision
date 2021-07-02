import { forwardRef } from 'react'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { Typography } from '@equinor/eds-core-react'
import { add_circle_outlined, remove_outlined } from '@equinor/eds-icons'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens
import {
  Accordion as RAccordion,
  AccordionItem as RAccordionItem,
  AccordionButton as RAccordionButton,
  AccordionPanel as RAccordionPanel,
  AccordionProps as RAccordionProps,
  AccordionItemProps as RAccordionItemProps,
  AccordionButtonProps as RAccordionButtonProps,
  AccordionPanelProps as RAccordionPanelProps,
  useAccordionItemContext,
} from '@reach/accordion'

export type AccordionProps = RAccordionProps

export type AccordionItemProps = RAccordionItemProps
export type AccordionHeaderProps = {
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5'
} & RAccordionButtonProps
export type AccordionPanelProps = RAccordionPanelProps

export const Accordion = ({ children, ...rest }: AccordionProps) => {
  return (
    <RAccordion collapsible multiple {...rest}>
      {children}
    </RAccordion>
  )
}

const StyledItem = styled(RAccordionItem)`
  border-bottom: 1px solid var(--grey-40);
`

export const Item = forwardRef<HTMLDivElement, RAccordionItemProps>(function Item({ children, ...rest }, ref) {
  return (
    <StyledItem ref={ref} {...rest}>
      {children}
    </StyledItem>
  )
})

const StyledHeader = styled(Typography)`
  margin: 0;
`

const StyledRAccordionButton = styled(RAccordionButton)`
  display: flex;
  align-items: center;
  width: 100%;
  background: transparent;
  padding: var(--space-small) 0;
  border: none;
  cursor: pointer;
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
`
const StyledTypography = styled(Typography)<{ isExpanded?: boolean }>`
  font-size: var(--typeScale-1);
  line-height: var(--lineHeight-2);
  display: inline-block;
  padding-top: 2px;
  text-align: left;
  ${({ isExpanded }) =>
    isExpanded && {
      fontWeight: 700,
    }}
`

const StyledIcon = styled(Icon)`
  flex: 0 0 var(--space-xLarge);
  fill: var(--energy-red-100);
`
export const Header = forwardRef<HTMLButtonElement, AccordionHeaderProps>(function Header(
  { headingLevel = 'h3', children, ...rest },
  ref,
) {
  const context = useAccordionItemContext()
  const isExpanded = context.isExpanded
  return (
    <StyledHeader forwardedAs={headingLevel}>
      <StyledRAccordionButton ref={ref} {...rest}>
        {isExpanded ? (
          <StyledIcon size={16} data={remove_outlined} />
        ) : (
          <StyledIcon size={16} data={add_circle_outlined} />
        )}
        <StyledTypography isExpanded={isExpanded} as="span">
          {children}
        </StyledTypography>
      </StyledRAccordionButton>
    </StyledHeader>
  )
})

const StyledPanel = styled(RAccordionPanel)`
  padding: var(--space-small) var(--space-small) var(--space-small) var(--space-xLarge);
  p:last-child {
    margin-bottom: 0;
  }
`

export const Panel = forwardRef<HTMLDivElement, RAccordionPanelProps>(function Panel({ children, ...rest }, ref) {
  return (
    <StyledPanel ref={ref} {...rest}>
      {children}
    </StyledPanel>
  )
})
