import { forwardRef } from 'react'
import { Button as EdsButton, ButtonProps as EdsButtonProps } from '@equinor/eds-core-react'
import Link from 'next/link'

export type ButtonProps = EdsButtonProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, href = null, ...rest }, ref) => {
  if (href) {
    return (
      <Link href={href} passHref>
        <EdsButton ref={ref} {...rest}>
          {children}
        </EdsButton>
      </Link>
    )
  }

  return (
    <EdsButton ref={ref} {...rest}>
      {children}
    </EdsButton>
  )
})

Button.displayName = 'Button'
