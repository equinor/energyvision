import { forwardRef } from 'react'
import styled from 'styled-components'

export type PullQuoteProps = {
  quote: string
  author: string
  image: any // TODO: add sanity image type
}

const Container = styled.div`
  display: flex;
  align-items: row;
`

const Quote = styled.p`
  background: none;
  margin: 0;
  font-style: italic;
`

const Author = styled.figcaption`
  text-align: right;
  margin-top: 1rem;
  font-style: italic;
`

export const PullQuote = forwardRef<HTMLDivElement, PullQuoteProps>(function BlockQuote(
  { quote, author, image = null },
  ref,
) {
  return (
    <Container>
      <figure ref={ref}>
        <Quote>{quote}</Quote>
        <Author>{author}</Author>
      </figure>
      {image ? (
        <div>
          <img src={image} alt="" />
        </div>
      ) : null}
    </Container>
  )
})
