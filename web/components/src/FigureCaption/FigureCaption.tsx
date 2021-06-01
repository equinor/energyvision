import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

const StyledTypography = styled(Typography)`
  font-size: var(--typeScale-0);
  margin-top: var(--space-small);

  /* If the text is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
  }
`
export type FigureCaptionProps = HTMLAttributes<HTMLElement>

export const FigureCaption = forwardRef<HTMLElement, FigureCaptionProps>(function FigureCaption(
  { children, ...rest },
  ref,
) {
  return (
    <StyledTypography forwardedAs="figcaption" ref={ref} {...rest}>
      {children}
    </StyledTypography>
  )
})
