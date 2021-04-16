import { PullQuote } from '@components'
import Img from 'next/image'
import { imageProps } from '../helpers'
import styled from 'styled-components'

const Container = styled.div`
  --max-width: 1700px;
  --margin-auto: calc(100% - var(--max-width));
  --margin-auto-half: calc(var(--margin-auto) / 2);

  padding: 0 var(--layout-spacing-small) 0 var(--layout-spacing-medium);
  max-width: var(--max-width);
  margin: var(--space-xxLarge) auto;
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
