import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type CardProps = {
  /** Example prop */
  test?: string
} & HTMLAttributes<HTMLDivElement>

const StyledCard = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <StyledCard {...props}>{children}</StyledCard>
})
