import { forwardRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: row;
`

const Quote = styled.blockquote`
  background: none;
  margin: 0;
`

const Author = styled.figcaption`
  text-align: right;
  margin-top: 1rem;
  font-style: italic;
`

export type BlockQuoteProps = {
  quote: string
  author: string
  image?: string | null // url
}

export const BlockQuote = forwardRef<HTMLDivElement, BlockQuoteProps>(function BlockQuote(
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
