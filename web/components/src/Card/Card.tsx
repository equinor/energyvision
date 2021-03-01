import { forwardRef, HTMLAttributes } from 'react'
import { Card as EdsCard } from '@equinor/eds-core-react'
import styled from 'styled-components'

export type CardProps = {
  /** Example prop */
  type?: 'news' | 'greenEnergy'
} & HTMLAttributes<HTMLDivElement>

export const StyledCard = styled(EdsCard)`
  height: 100%;
  grid-template-rows: auto auto auto 1fr;
  &:hover {
    cursor: pointer;
  }
`

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ type = 'news', children, ...rest }, ref) {
  const variant = type === 'news' ? 'info' : 'warning'
  return (
    <StyledCard variant={variant} ref={ref} {...rest}>
      {children}
    </StyledCard>
  )
})
