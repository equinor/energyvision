/* eslint-disable no-unused-vars */
import { forwardRef } from 'react'
import styled from 'styled-components'
import { Text } from '@components'

export type PullQuoteProps = {
  quote: string
  author: string
  authorTitle: string
  image: any // TODO: add sanity image type
}

const Container = styled.figure`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: min-content min-content;
  margin: 0;
`

// TODO: margin from Text is unwanted here?
const Quote = styled((props) => <Text {...props}></Text>)`
  font-style: italic;
  grid-column: 1 / 4;
`

// TODO: font size for figcaption
const AuthorRow = styled.figcaption`
  text-align: left;
  margin-top: 1rem;
  grid-row: 2 / 2;
  grid-column: 3 / 4;
`

const Author = styled.strong`
  display: block;
`

const AuthorTitle = styled.span`
  display: block;
`

// TODO: image
export const PullQuote = forwardRef<HTMLDivElement, PullQuoteProps>(function BlockQuote(
  { quote, author, authorTitle = null, image = null },
  ref,
) {
  return (
    <Container ref={ref}>
      <Quote size="md">{quote}</Quote>
      <AuthorRow>
        <Author>{author}</Author>
        {authorTitle ? <AuthorTitle>{authorTitle}</AuthorTitle> : null}
      </AuthorRow>
    </Container>
  )
})
