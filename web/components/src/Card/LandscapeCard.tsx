import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'

export type CardProps = HTMLAttributes<HTMLDivElement>

export const StyledLandscapeCard = styled.div`
  display: inline-flex;
  flex-direction: row;
  box-shadow: var(--card-shadow, none);
  background-color: var(--card-background, transparent);
  gap: var(--card-gap, var(--space-large));
  padding: var(--card-padding, 0 0 var(--space-xLarge) 0);
  justify-content: center;
  &:hover {
    cursor: inherit;
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
