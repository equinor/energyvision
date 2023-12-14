import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Typography } from '@equinor/eds-core-react'

type AuthorProps = {
  title?: string | null
} & HTMLAttributes<HTMLDivElement>

const Row = styled.figcaption`
  text-align: left;
  grid-area: author;
  align-self: end;

  @media (min-width: 800px) {
    text-align: right;
    align-self: start;
  }
`

const AuthorWrapper = styled(Typography)`
  text-align: left;
  display: inline-flex;
  flex-direction: column;
  margin-right: auto;
  .inverted-background & {
    color: var(--inverted-text);
  }

  @media (min-width: 800px) {
    margin-left: auto;
  }
`

const TextWrapper = styled.span`
  .inverted-background & {
    color: var(--inverted-text);
  }
`

export const Author = forwardRef<HTMLDivElement, AuthorProps>(function Author(
  { children, title = null, ...rest },
  ref,
) {
  return (
    <Row ref={ref} {...rest}>
      {title ? (
        <AuthorWrapper forwardedAs="div">
          <strong>{children}</strong>
          {title}
        </AuthorWrapper>
      ) : (
        <TextWrapper>{children}</TextWrapper>
      )}
    </Row>
  )
})
