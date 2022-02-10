import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

const StyledTypography = styled(Typography)`
  font-size: var(--typeScale-2);
  line-height: var(--lineHeight-3);
  margin-bottom: calc(var(--space-medium) * -1);

  /* If the text is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
  }
`
export type TeaserEyebrowProps = HTMLAttributes<HTMLDivElement>

export const Eyebrow = forwardRef<HTMLDivElement, TeaserEyebrowProps>(function Eyebrow({ children, ...rest }, ref) {
  return (
    <StyledTypography forwardedAs="div" ref={ref} {...rest}>
      {children}
    </StyledTypography>
  )
})
