import { forwardRef } from 'react'
import styled from 'styled-components'
import { AccordionButton as RAccordionButton, AccordionButtonProps as RAccordionButtonProps } from '@reach/accordion'

const StyledButton = styled(RAccordionButton)``

export type SubMenuHeaderProps = RAccordionButtonProps

export const SubMenuHeader = forwardRef<HTMLDivElement, SubMenuHeaderProps>(function SubMenuHeader({
  children,
  ...rest
}) {
  return <StyledButton {...rest}>{children}</StyledButton>
})
