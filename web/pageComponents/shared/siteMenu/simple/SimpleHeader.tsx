import { CSSProperties } from 'react'
import styled from 'styled-components'
import { Icon, Typography, TypographyProps } from '@equinor/eds-core-react'
import { add, minimize } from '@equinor/eds-icons'
import { outlineTemplate, Tokens } from '@utils'
import { AccordionButton, useAccordionItemState } from '@chakra-ui/react'

const { outline } = Tokens

const StyledButton = styled(AccordionButton)`
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
  const { isOpen } = useAccordionItemState()

  return (
    <Typography as="h2" {...rest}>
      <StyledButton>
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
      </StyledButton>
    </Typography>
  )
}
