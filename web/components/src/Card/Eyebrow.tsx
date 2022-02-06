import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'

export type EyebrowProps = HTMLAttributes<HTMLDivElement>

export const Eyebrow = forwardRef<HTMLDivElement, EyebrowProps>(function Eyebrow({ children, ...rest }, ref) {
  return process.env.NEXT_PUBLIC_VNYS_717_IMPROVED_TYPOGRAPHY === 'true' ? (
    <Typography style={{ fontSize: 'var(--typeScale-00)' }} variant="overline" as="div" ref={ref} {...rest}>
      {children}
    </Typography>
  ) : (
    <Typography variant="overline" as="div" ref={ref} {...rest}>
      {children}
    </Typography>
  )
})
