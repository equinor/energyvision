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
  @media (min-width: 520px) {
    grid-template-columns: var(--column-sizes, auto 1fr);
  }
`

export const LandscapeCard = forwardRef<HTMLDivElement, CardProps>(function Card({ style, children, ...rest }, ref) {
  return (
    <StyledLandscapeCard
      ref={ref}
      style={
        {
          '--card-shadow': 'var(--card-box-shadow)',
          '--card-background': 'var(--bg-default)',
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
