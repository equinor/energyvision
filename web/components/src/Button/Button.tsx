import { forwardRef } from 'react'
import { Button as EdsButton, ButtonProps as EdsButtonProps } from '@equinor/eds-core-react'

export type ButtonProps = EdsButtonProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ children, ...rest }, ref) {
  return (
    <EdsButton ref={ref} {...rest}>
      {children}
    </EdsButton>
  )
})
