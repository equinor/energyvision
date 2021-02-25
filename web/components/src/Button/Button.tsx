import { forwardRef } from 'react'
import { Button as EdsButton, ButtonProps as EdsButtonProps } from '@equinor/eds-core-react'

export type ButtonProps = EdsButtonProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...rest }, ref) => (
  <EdsButton ref={ref} {...rest}>
    {children}
  </EdsButton>
))

Button.displayName = 'Button'
