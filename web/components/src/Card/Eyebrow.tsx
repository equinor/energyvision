import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'

export type EyebrowProps = HTMLAttributes<HTMLElement>

export const Eyebrow = forwardRef<HTMLElement, EyebrowProps>(function Eyebrow({ children, ...rest }, ref) {
  return (
    <Typography style={{ fontSize: 'var(--typeScale-00)' }} variant="overline" as="div" ref={ref} {...rest}>
      {children}
    </Typography>
  )
})
