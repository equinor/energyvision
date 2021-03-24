import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

/* @TODO: Create a flexible, reusable Title component?

/* @TODO: How to use this typography scale with EDS */
const StyledTypography = styled(Typography)`
  font-size: var(--typeScale-2);

  text-align: center;
  margin-bottom: var(--spacer-vertical-medium);
`

export type TitleProps = HTMLAttributes<HTMLHeadingElement>

export const Title = forwardRef<HTMLDivElement, TitleProps>(function Title({ children, ...rest }, ref) {
  return (
    <StyledTypography variant="h3" ref={ref} {...rest}>
      {children}
    </StyledTypography>
  )
})
