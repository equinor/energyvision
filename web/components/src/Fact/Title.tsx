import { HTMLAttributes } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

/* @TODO: How to use this typography scale with EDS */
const StyledTypography = styled(Typography)`
  font-size: var(--typeScale-2);
`

export type TitleProps = HTMLAttributes<HTMLHeadingElement>

export const Title = ({ children, ...rest }: TitleProps): JSX.Element => {
  return (
    <StyledTypography variant="h3" {...rest}>
      {children}
    </StyledTypography>
  )
}
