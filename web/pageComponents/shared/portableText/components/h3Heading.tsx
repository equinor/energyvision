import styled from 'styled-components'
import { Typography } from '@core/Typography'

const StyledHeading = styled(Typography)`
  font-weight: var(--fontWeight-regular);
  line-height: var(--lineHeight-3);
  margin-bottom: 0.5em;

  &:not(:first-child) {
    margin-top: 1.5em;
  }
`

export const h3Heading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Typography as="h3" variant="lg">
      {children}
    </Typography>
  )
}
