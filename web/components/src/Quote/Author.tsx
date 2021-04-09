import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

type AuthorProps = {
  name: string
  title: string | null
} & HTMLAttributes<HTMLDivElement>

// TODO: font size for figcaption
const Row = styled.figcaption`
  text-align: left;
  grid-area: author;
  align-self: end;

  @media (min-width: 800px) {
    text-align: right;
    align-self: start;
  }
`

const Name = styled.strong`
  display: block;
`

const Title = styled.span`
  display: block;
`

export const Author = forwardRef<HTMLDivElement, AuthorProps>(function Author({ name, title = null, ...rest }, ref) {
  return (
    <Row ref={ref} {...rest}>
      <Name>{name}</Name>
      {title ? <Title>{title}</Title> : null}
    </Row>
  )
})
