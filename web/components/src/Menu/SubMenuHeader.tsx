import { forwardRef } from 'react'
import styled from 'styled-components'
import {
  AccordionButton as RAccordionButton,
  AccordionButtonProps as RAccordionButtonProps,
  useAccordionItemContext,
} from '@reach/accordion'
import { Icon, Typography } from '@equinor/eds-core-react'
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
`
const StyledTypography = styled(Typography)``
export type SubMenuHeaderProps = RAccordionButtonProps

export const SubMenuHeader = forwardRef<HTMLButtonElement, SubMenuHeaderProps>(function SubMenuHeader(
  { children, ...rest },
  ref,
) {
  const context = useAccordionItemContext()
  const isExpanded = context.isExpanded
  return (
    <StyledHeader forwardedAs="h3">
      <StyledButton ref={ref} {...rest}>
        <StyledTypography forwardedAs="span">{children}</StyledTypography>
        {isExpanded ? <Icon data={minimize} /> : <Icon data={add} />}
      </StyledButton>
    </StyledHeader>
  )
})
