import { forwardRef } from 'react'
import styled from 'styled-components'
import { Icon, Typography } from '@equinor/eds-core-react'
import { add_circle_outlined, remove_outlined, add_circle_filled, remove } from '@equinor/eds-icons'
import {
  AccordionButton as RAccordionButton,
  AccordionButtonProps as RAccordionButtonProps,
  useAccordionItemContext,
} from '@reach/accordion'

import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

export type AccordionHeaderProps = {
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5'
} & RAccordionButtonProps

const StyledRAccordionButton = styled(RAccordionButton)`
  display: flex;
  align-items: center;
  width: 100%;
  background: transparent;
  padding: var(--space-medium) 0;
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
  @media (prefers-reduced-motion: no-preference) {
    transition: font-weight 0.1s ease-in-out;
  }
  .inverted-background & {
    color: var(--inverted-text);
  }
  ${({ isExpanded }) =>
    isExpanded && {
      fontWeight: 700,
    }}
`

const FilledIcon = styled(Icon)``

const OutlineIcon = styled(Icon)``

const StyledIcon = styled.span`
  flex: 0 0 var(--space-xLarge);
  line-height: 16px;
  & ${FilledIcon}, & ${OutlineIcon} {
    fill: var(--energy-red-100);
  }
`
const StyledHeader = styled(Typography)`
  margin: 0;
  & ${FilledIcon} {
    display: none;
  }
  &:hover ${FilledIcon} {
    display: inline-flex;
  }
  &:hover ${OutlineIcon} {
    display: none;
  }
`

export const Header = forwardRef<HTMLButtonElement, AccordionHeaderProps>(function Header(
  { headingLevel = 'h3', children, ...rest },
  ref,
) {
  const context = useAccordionItemContext()
  const isExpanded = context.isExpanded
  const iconSize = 24
  return (
    <StyledHeader forwardedAs={headingLevel}>
      <StyledRAccordionButton ref={ref} {...rest}>
        {/* Let's do it in the easiest way by just swapping the icons and see how that works */}
        {isExpanded ? (
          <StyledIcon>
            <OutlineIcon size={iconSize} data={remove_outlined} />
            <FilledIcon size={iconSize} data={remove} />
          </StyledIcon>
        ) : (
          <StyledIcon>
            <OutlineIcon size={iconSize} data={add_circle_outlined} />
            <FilledIcon size={iconSize} data={add_circle_filled} />
          </StyledIcon>
        )}
        <StyledTypography isExpanded={isExpanded} forwardedAs="span">
          {children}
        </StyledTypography>
      </StyledRAccordionButton>
    </StyledHeader>
  )
})
