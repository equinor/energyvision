import { forwardRef, HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

type StyledTypographyType = {
  center: boolean
}
/* @TODO: How to use this typography scale with EDS */
const StyledTypography = styled(Typography)<StyledTypographyType>`
  font-size: var(--typeScale-2);
  ${({ center }) =>
    center && {
      textAlign: 'center',
    }}
`

export type TitleProps = {
  /* It the title should be centered or not. Default to true */
  center?: boolean
} & HTMLAttributes<HTMLHeadingElement>

export const Title = forwardRef<HTMLDivElement, TitleProps>(function CardMedia(
  { center = true, children, ...rest },
  ref,
) {
  return (
    <StyledTypography center={center} variant="h3" ref={ref} {...rest}>
      {children}
    </StyledTypography>
  )
})
