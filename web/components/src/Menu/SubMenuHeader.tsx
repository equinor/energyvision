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

const StyledHeader = styled(Typography)``
const StyledTypography = styled(Typography)``
export type SubMenuHeaderProps = RAccordionButtonProps

export const SubMenuHeader = forwardRef<HTMLDivElement, SubMenuHeaderProps>(function SubMenuHeader({
  children,
  ...rest
}) {
  const context = useAccordionItemContext()
  const isExpanded = context.isExpanded
  return (
    <StyledHeader forwardedAs="h3">
      <StyledButton {...rest}>
        <StyledTypography forwardedAs="span">{children}</StyledTypography>
        {isExpanded ? <Icon data={minimize} /> : <Icon data={add} />}
      </StyledButton>
    </StyledHeader>
  )
})
