import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

type AuthorProps = {
  name: string
  title: string | null
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

const AuthorWrapper = styled.div`
  text-align: left;
  display: inline-flex;
  flex-direction: column;
  margin-right: auto;

  @media (min-width: 800px) {
    margin-left: auto;
  }
`

export const Author = forwardRef<HTMLDivElement, AuthorProps>(function Author({ name, title = null, ...rest }, ref) {
  return (
    <Row ref={ref} {...rest}>
      {title ? (
        <AuthorWrapper>
          <strong>{name}</strong>
          {title}
        </AuthorWrapper>
      ) : (
        <strong>{name}</strong>
      )}
    </Row>
  )
})
