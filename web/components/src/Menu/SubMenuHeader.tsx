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
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
`

const StyledHeader = styled(Typography)`
  padding: 0 var(--space-large);
  background-color: var(--background-color);
`
const StyledTypography = styled(Typography)`
  font-weight: var(--font-weight);
`

export type SubMenuHeaderProps = TypographyProps & RAccordionButtonProps

export const SubMenuHeader = forwardRef<HTMLButtonElement, SubMenuHeaderProps>(function SubMenuHeader(
  { children, style, ...rest },
  ref,
) {
  const context = useAccordionItemContext()
  const isExpanded = context.isExpanded
  return (
    <StyledHeader
      forwardedAs="h3"
      style={
        {
          ...style,
          '--background-color': isExpanded ? 'var(--grey-10)' : 'var(--ui-background-default)',
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
        {isExpanded ? <Icon data={minimize} /> : <Icon data={add} />}
      </StyledButton>
    </StyledHeader>
  )
})
