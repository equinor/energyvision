import { forwardRef } from 'react'
import styled from 'styled-components'
import { Button as EdsButton, ButtonProps as EdsButtonProps } from '@equinor/eds-core-react'

export type ButtonProps = EdsButtonProps

const StyledEdsButton = styled(EdsButton)`
  --eds_button__font_size: var(--typeScale-05);
  --eds_button__padding_x: var(--space-medium);
  --eds_button__radius: var(--space-4);
  --eds_button__height: auto;
`

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ children, ...rest }, ref) {
  return (
    <StyledEdsButton ref={ref} {...rest}>
      {children}
    </StyledEdsButton>
  )
})
