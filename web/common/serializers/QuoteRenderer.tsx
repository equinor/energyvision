import { PullQuote } from '@components'
import Img from 'next/image'
import { imageProps } from '../helpers'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0 var(--layout-spacing-medium);
  max-width: 1700px;
  margin-left: auto;
  margin-right: auto;
  margin: var(--space-xxLarge) 0;
`

export const QuoteRenderer = (child: { node: any }): JSX.Element => {
  const { node } = child
  const { quote, author, authorTitle, image }: { quote: string; author: string; authorTitle: string; image: any } = node

  return (
    <Container>
      <PullQuote>
        <PullQuote.Quote text={quote} />
        <PullQuote.Author name={author} title={authorTitle} />

        {image ? (
          <PullQuote.Media>
            <Img {...imageProps(image, 400, 1)} alt={image.alt} />
          </PullQuote.Media>
        ) : null}
      </PullQuote>
    </Container>
  )
}
