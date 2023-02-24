import { CSSProperties } from 'react'
import styled from 'styled-components'
import { AccordionButton as RAccordionButton, useAccordionItemContext } from '@reach/accordion'
import { Icon, Typography, TypographyProps } from '@equinor/eds-core-react'
import { add, minimize } from '@equinor/eds-icons'
import { outlineTemplate, Tokens } from '@utils'
import { AccordionButton as CAccordionButton, useAccordionItemState } from '@chakra-ui/react'
import { Flags } from '../../../../common/helpers/datasetHelpers'

const { outline } = Tokens

const StyledButton = styled(RAccordionButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  padding: var(--space-medium) 0;
  border: none;
  cursor: pointer;
  color: var(--default-text);

  outline: none;
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
`

const ChakraStyledButton = styled(CAccordionButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  padding: var(--space-medium) 0;
  border: none;
  cursor: pointer;
  color: var(--default-text);

  outline: none;
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
`

const StyledTypography = styled(Typography)`
  font-weight: var(--font-weight);
  font-size: var(--typeScale-1);
`

type SimpleHeaderProps = TypographyProps

export const SimpleHeader = ({ children, ...rest }: SimpleHeaderProps) => {
  const context = useAccordionItemContext()
  const isExpanded = context.isExpanded
  const { isOpen } = useAccordionItemState()

  return (
    <Typography as="h2" {...rest}>
      {Flags.IS_DEV ? (
        <ChakraStyledButton>
          <StyledTypography
            forwardedAs="span"
            style={
              {
                '--font-weight': isOpen ? '700' : '400',
              } as CSSProperties
            }
          >
            {children}
          </StyledTypography>
          {isOpen ? <Icon data={minimize} /> : <Icon data={add} />}
        </ChakraStyledButton>
      ) : (
        <StyledButton>
          <StyledTypography
            forwardedAs="span"
            style={
              {
                '--font-weight': isExpanded ? '700' : '400',
              } as CSSProperties
            }
          >
            {children}
          </StyledTypography>
          {isExpanded ? <Icon data={minimize} /> : <Icon data={add} />}
        </StyledButton>
      )}
    </Typography>
  )
}
