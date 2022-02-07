import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

type SpanProps = HTMLAttributes<HTMLSpanElement>
type StyledAttributionProps = { color?: 'default' | 'light' }
export type AttributionProps = StyledAttributionProps & SpanProps

export const StyledAttribution = styled.span<StyledAttributionProps>`
  white-space: nowrap;
  color: var(--grey-60);
  ${({ color }) =>
    color === 'light' && {
      color: 'var(--grey-40)',
    }};
`
export const Attribution = forwardRef<HTMLSpanElement, AttributionProps>(function (
  { color = 'default', children, ...rest },
  ref,
) {
  return (
    <StyledAttribution color={color} ref={ref} {...rest}>
      {children}
    </StyledAttribution>
  )
})
