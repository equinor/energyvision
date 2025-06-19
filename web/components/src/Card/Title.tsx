import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '../../../core/Typography'

import styled from 'styled-components'

const StyledTitle = styled.div`
  margin-left: 0;
`

const StyledHeading = styled(Typography)`
  margin-bottom: 0;

  // TODO: Don’t use !important.
  font-size: var(--card-title-fontSize, var(--typeScale-2)) !important;
  font-weight: var(--card-title-fontWeight, var(--fontWeight-regular)) !important;
`

export type TitleProps = {
  /* Header level */
  level?: 'h2' | 'h3' | 'h4' | 'h5'
} & HTMLAttributes<HTMLHeadingElement>

export const Title = forwardRef<HTMLDivElement, TitleProps>(function Title({ level = 'h3', children, ...rest }, ref) {
  return (
    <StyledTitle ref={ref} {...rest}>
      <StyledHeading as={level}>{children}</StyledHeading>
    </StyledTitle>
  )
})
