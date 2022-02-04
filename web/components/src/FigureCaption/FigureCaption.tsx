import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { style } from '@equinor/eds-icons'

export const StyledFigcaption = styled(Typography)`
  font-size: var(--size);
  margin-top: var(--space-small);

  /* If the text is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
  }

  @media (min-width: 800px) {
    max-width: 560px;
  }

  @media (min-width: 1300px) {
    max-width: 635px;
  }
`
export const StyledAttribution = styled.span<{ lightAttributionColor: boolean }>`
  white-space: nowrap;
  color: var(--grey-60);
  ${({ lightAttributionColor }) =>
    lightAttributionColor && {
      color: 'var(--grey-40)',
    }};
`

export type FigureCaptionProps = {
  size?: 'small' | 'medium'
  caption?: string | JSX.Element
  attribution?: string
  lightAttributionColor?: boolean
} & HTMLAttributes<HTMLElement>

export const FigureCaption = forwardRef<HTMLElement, FigureCaptionProps>(function FigureCaption(
  { size = 'small', caption, attribution, lightAttributionColor = false, ...rest },
  ref,
) {
  return (
    <StyledFigcaption
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
      {caption && caption + ' '}
      {attribution && (
        <StyledAttribution lightAttributionColor={lightAttributionColor}>{attribution}</StyledAttribution>
      )}
    </StyledFigcaption>
  )
})
