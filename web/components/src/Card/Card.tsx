import { forwardRef, HTMLAttributes } from 'react'
import { Card as EdsCard } from '@equinor/eds-core-react'
import styled from 'styled-components'

export type CardProps = {
  /** What kind of card is this (we'll probably add things to this list) */
  type?: 'news'
} & HTMLAttributes<HTMLDivElement>

export const StyledCard = styled(EdsCard)`
  height: 100%;
  grid-template-rows: auto auto auto 1fr;
  /* @TODO: Spacings */
  padding: 0 0 1rem 0;

  &:hover {
    cursor: inherit;
  }
`

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ type = 'news', children, ...rest }, ref) {
  const variant = type === 'news' ? 'default' : 'info'
  return (
    <StyledCard variant={variant} ref={ref} {...rest}>
      {children}
    </StyledCard>
  )
})
