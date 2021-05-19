import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

const StyledTypography = styled(Typography)`
  font-size: var(--typeScale-2);
  line-height: var(--lineHeight-3);
  margin-bottom: -1rem;
`
export type TeaserEyebrowProps = HTMLAttributes<HTMLDivElement>

export const Eyebrow = forwardRef<HTMLDivElement, TeaserEyebrowProps>(function Eyebrow({ children, ...rest }, ref) {
  return (
    <StyledTypography as="div" ref={ref} {...rest}>
      {children}
    </StyledTypography>
  )
})
