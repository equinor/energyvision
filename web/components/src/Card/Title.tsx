import { forwardRef, HTMLAttributes } from 'react'
import { Heading } from '../Heading'

import styled from 'styled-components'

const StyledTitle = styled.div`
  margin-left: 0;
`

const StyledHeading = styled(Heading)`
  margin-bottom: 0;

  [data-dynamic-typography-version='v2'] & {
    // TODO: Don’t use !important.
    font-size: var(--card-title-fontSize, var(--typeScale-2)) !important;
    font-weight: var(--card-title-fontWeight, var(--fontWeight-regular)) !important;
  }
`

export type TitleProps = {
  /* Header level */
  level?: 'h2' | 'h3' | 'h4' | 'h5'
} & HTMLAttributes<HTMLHeadingElement>

export const Title = forwardRef<HTMLDivElement, TitleProps>(function Title({ level = 'h3', children, ...rest }, ref) {
  return process.env.NEXT_PUBLIC_VNYS_717_IMPROVED_TYPOGRAPHY === 'true' ? (
    <StyledTitle ref={ref} {...rest}>
      <StyledHeading level={level}>{children}</StyledHeading>
    </StyledTitle>
  ) : (
    <StyledTitle ref={ref} {...rest}>
      <StyledHeading level={level} size="lg">
        {children}
      </StyledHeading>
    </StyledTitle>
  )
})
