import { forwardRef, CSSProperties, HTMLAttributes } from 'react'
import styled from 'styled-components'

export const StyledFact = styled.div`
  background-color: var(--background, var(--ui-background-warm));
  padding: var(--spacer-vertical-large) var(--spacer-horizontal-medium);
`

/* @TODO: Which pattern to use for color names and prop name? */
export type FactProps = {
  background?: 'none' | 'cold' | 'warm'
} & HTMLAttributes<HTMLDivElement>

const backgroundVariants = {
  none: 'var(--ui-background-default)',
  cold: 'var(--ui-background-cold)',
  warm: 'var(--ui-background-warm)',
}

export const Fact = forwardRef<HTMLDivElement, FactProps>(function Fact(
  { background = 'none', children, ...rest },
  ref,
) {
  return (
    <StyledFact style={{ '--background': backgroundVariants[background] } as CSSProperties} {...rest} ref={ref}>
      {children}
    </StyledFact>
  )
})
