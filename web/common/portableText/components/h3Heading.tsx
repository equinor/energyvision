import styled from 'styled-components'
import type { PortableTextBlock } from '@portabletext/types'
import { Heading } from '@components'

const StyledHeading = styled(Heading)`
  font-weight: 600;
  line-height: var(--lineHeight-3);
  margin-bottom: 0.5em;

  &:not(:first-child) {
    margin-top: 1.5em;
  }
`

export const h3Heading = (value: PortableTextBlock) => {
  const { children } = value

  return (
    <StyledHeading level="h3" size="sm">
      {children}
    </StyledHeading>
  )
}
