import { forwardRef, HTMLAttributes } from 'react'
import { Card as EdsCard } from '@equinor/eds-core-react'

export type CardProps = {
  /** Example prop */
  type?: 'news' | 'greenEnergy'
} & HTMLAttributes<HTMLDivElement>

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ type = 'news', children, ...rest }, ref) {
  const variant = type === 'news' ? 'info' : 'warning'
  return (
    <EdsCard variant={variant} ref={ref} {...rest}>
      {children}
    </EdsCard>
  )
})
