import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

/* @TODO: How to use this typography scale with EDS */
const StyledTypography = styled(Typography)<TitleProps>`
  font-size: var(--typeScale-2);
  ${({ alignment }) =>
    alignment === 'center' && {
      textAlign: 'center',
    }}
`

export type TitleProps = {
  /* It the title should be centered or not. Default to true */
  alignment?: 'center' | 'left'
} & HTMLAttributes<HTMLHeadingElement>

export const Title = forwardRef<HTMLDivElement, TitleProps>(function Title(
  { alignment = 'center', children, ...rest },
  ref,
) {
  return (
    <StyledTypography alignment={alignment} variant="h3" ref={ref} {...rest}>
      {children}
    </StyledTypography>
  )
})
