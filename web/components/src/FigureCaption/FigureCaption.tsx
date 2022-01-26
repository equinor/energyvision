import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { style } from '@equinor/eds-icons'

const StyledTypography = styled(Typography)`
  font-size: var(--size);
  margin-top: var(--space-small);

  /* If the text is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
  }
`
export type FigureCaptionProps = {
  size?: 'small' | 'medium'
} & HTMLAttributes<HTMLElement>

export const FigureCaption = forwardRef<HTMLElement, FigureCaptionProps>(function FigureCaption(
  { size = 'small', children, ...rest },
  ref,
) {
  return (
    <StyledTypography
      forwardedAs="figcaption"
      style={
        {
          ...style,
          '--size': size === 'small' ? 'var(--typeScale-0)' : 'var(--typeScale-1)',
        } as CSSProperties
      }
      ref={ref}
      {...rest}
    >
      {children}
    </StyledTypography>
  )
})
