import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type CardProps = {
  /** Example prop */
  test: string
} & HTMLAttributes<HTMLDivElement>

const StyledCard = styled.div``

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ children, onClick, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return (
    <StyledCard {...props} onClick={onClick}>
      {children}
    </StyledCard>
  )
})
