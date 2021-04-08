import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

type AuthorProps = {
  name: string
  title: string | null
} & HTMLAttributes<HTMLDivElement>

// TODO: font size for figcaption
const Row = styled.figcaption`
  text-align: right;
  margin-top: 1rem;
  grid-row: 2 / 2;
  grid-column: 2 / 3;
  align-self: start;
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
