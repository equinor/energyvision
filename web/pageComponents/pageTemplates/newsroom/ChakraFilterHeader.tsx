import styled from 'styled-components'
import { Typography, Icon } from '@equinor/eds-core-react'
import { chevron_down, chevron_up } from '@equinor/eds-icons'
import { outlineTemplate, Tokens } from '@utils'
import { AccordionButton as CAccordionButton, useAccordionItemState } from '@chakra-ui/react'

const { outline } = Tokens

const ChakraStyledAccordionButton = styled(CAccordionButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  padding: var(--space-small) var(--space-large);
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

  /* ${({ isExpanded }) =>
    isExpanded && {
      fontWeight: 700,
    }} */
`

const ChakraFilterHeader = ({ label }: { label: string }) => {
  const { isOpen } = useAccordionItemState()

  const iconSize = 24
  return (
    <>
      <ChakraStyledAccordionButton>
        <StyledTypography isExpanded={isOpen} forwardedAs="span">
          {label}
        </StyledTypography>
        {isOpen ? <Icon size={iconSize} data={chevron_up} /> : <Icon size={iconSize} data={chevron_down} />}
      </ChakraStyledAccordionButton>
    </>
  )
}

export default ChakraFilterHeader
