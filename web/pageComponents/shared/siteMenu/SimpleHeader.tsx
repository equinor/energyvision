import { forwardRef, CSSProperties } from 'react'
import styled from 'styled-components'
import {
  AccordionButton as RAccordionButton,
  AccordionButtonProps as RAccordionButtonProps,
  useAccordionItemContext,
} from '@reach/accordion'
import { Icon, Typography, TypographyProps } from '@equinor/eds-core-react'
import { add, minimize } from '@equinor/eds-icons'
import { outlineTemplate, Tokens } from '@utils'

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

const StyledIcon = styled(Icon)``

const StyledHeader = styled(Typography)``
const StyledTypography = styled(Typography)`
  font-weight: 400;
`

export type SubMenuHeaderProps = TypographyProps & RAccordionButtonProps

export const SimpleHeader = forwardRef<HTMLButtonElement, SubMenuHeaderProps>(function SubMenuHeader(
  { children, style, ...rest },
  ref,
) {
  const context = useAccordionItemContext()
  const isExpanded = context.isExpanded
  return (
    <StyledHeader
      forwardedAs="h2"
      style={
        {
          ...style,
        } as CSSProperties
      }
    >
      <StyledButton ref={ref} {...rest}>
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
        {isExpanded ? <StyledIcon data={minimize} /> : <StyledIcon data={add} />}
      </StyledButton>
    </StyledHeader>
  )
})
