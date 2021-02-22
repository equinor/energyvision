import { forwardRef } from 'react'
import { Card as EDSCard, CardProps as EDSCardProps } from '@equinor/eds-core-react'

export type CardProps = {
  /** Example prop */
  variant?: string
} & EDSCardProps

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <EDSCard {...props}>{children}</EDSCard>
})
