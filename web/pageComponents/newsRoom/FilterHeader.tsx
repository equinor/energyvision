import { AccordionButton, useAccordionItemContext } from '@reach/accordion'
import styled from 'styled-components'
import { Typography, Icon } from '@equinor/eds-core-react'
import { chevron_down, chevron_up } from '@equinor/eds-icons'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

const StyledAccordionButton = styled(AccordionButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  padding: var(--space-small) 0;
  border: none;
  border-bottom: 1px solid var(--slate-blue-50);
  cursor: pointer;
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
`
const StyledTypography = styled(Typography)<{ isExpanded?: boolean }>`
  font-size: var(--typeScale-1);
  line-height: var(--lineHeight-2);
  display: inline-block;
  padding-top: var(--space-2);
  text-align: left;

  .inverted-background & {
    color: var(--inverted-text);
  }

  ${({ isExpanded }) =>
    isExpanded && {
      fontWeight: 700,
    }}
`

const FilterHeader = ({ label }: { label: string }) => {
  const { isExpanded } = useAccordionItemContext()

  const iconSize = 24
  return (
    <StyledAccordionButton>
      <StyledTypography isExpanded={isExpanded} forwardedAs="span">
        {label}
      </StyledTypography>
      {isExpanded ? <Icon size={iconSize} data={chevron_up} /> : <Icon size={iconSize} data={chevron_down} />}
    </StyledAccordionButton>
  )
}

export default FilterHeader
