import styled from 'styled-components'
import { Heading } from '@components'

const StyledHeading = styled(Heading)`
  font-weight: var(--fontWeight-regular);
  line-height: var(--lineHeight-3);
  margin-bottom: 0.5em;

  &:not(:first-child) {
    margin-top: 1.5em;
  }
`

export const h3Heading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <StyledHeading level="h3" size="lg">
      {children}
    </StyledHeading>
  )
}
