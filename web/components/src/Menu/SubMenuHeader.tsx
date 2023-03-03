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
  /* We add the focus ring manually for keyboard users */
  outline: none;
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
  @media (min-width: 1300px) {
    padding: var(--space-small) calc(var(--space-small) + var(--space-xSmall));
  }
`

const StyledIcon = styled(Icon)`
  @media (min-width: 1300px) {
    display: none;
  }
`

const StyledHeader = styled(Typography)`
  @media (min-width: 1300px) {
    padding: 0;
    border-bottom-color: var(--border-bottom-color);
    border-bottom-style: solid;
    border-bottom-width: 2px;
    &:hover {
      background-color: var(--moss-green-70);
    }
  }
`
const StyledTypography = styled(Typography)`
  font-weight: var(--font-weight);
  @media (min-width: 1300px) {
    font-weight: 400;
  }
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
      forwardedAs="h2"
      style={
        {
          ...style,
          '--border-bottom-color': isExpanded ? 'var(--moss-green-95)' : 'transparent ',
        } as CSSProperties
      }
      {...rest}
    >
      <StyledButton ref={ref}>
        <StyledTypography
          forwardedAs="span"
          style={
            {
              '--font-weight': isExpanded ? '700' : '400',
              fontSize: 'var(--typeScale-1)', // TODO: Update EDS Typography component
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
