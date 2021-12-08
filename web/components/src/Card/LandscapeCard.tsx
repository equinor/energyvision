import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'

export type CardProps = HTMLAttributes<HTMLDivElement>

export const StyledLandscapeCard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  box-shadow: var(--card-shadow, none);
  background-color: var(--card-background, transparent);
  gap: var(--card-gap, var(--space-large));
  justify-content: center;
  width: 100%;

  &:hover {
    cursor: inherit;
  }
  @media (min-width: 450px) {
    grid-template-columns: auto 1fr;
  }
`

export const LandscapeCard = forwardRef<HTMLDivElement, CardProps>(function Card({ style, children, ...rest }, ref) {
  return (
    <StyledLandscapeCard
      ref={ref}
      style={
        {
          '--card-shadow': '0px 6px 20px rgba(0, 0, 0, 0.2)',
          '--card-background': 'var(--ui-background-default)',
          '--card-padding': '0 0 var(--space-small) 0',
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledLandscapeCard>
  )
})
