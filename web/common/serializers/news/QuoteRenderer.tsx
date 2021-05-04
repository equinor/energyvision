import { PullQuote } from '@components'
import Img from 'next/image'
import { imageProps } from '../../helpers'
import styled from 'styled-components'
import type { ImageWithAlt } from '../../../types/types'

const { Quote, Author, Media } = PullQuote
const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-small) 0 var(--layout-paddingHorizontal-medium);
  max-width: var(--maxViewportWidth);
  margin: var(--space-xxLarge) auto;
  clear: both;
`

type QuoteRendererNode = {
  quote: string
  author: string
  authorTitle: string
  image: ImageWithAlt
}

export const QuoteRenderer = (child: { node: QuoteRendererNode }): JSX.Element => {
  const { node } = child
  const { quote, author, authorTitle, image } = node
  return (
    <Container>
      <PullQuote>
        <Quote>{quote}</Quote>
        <Author title={authorTitle}>{author}</Author>

        {image ? (
          <Media>
            <Img
              {...imageProps(image, 220, 1)}
              alt={image.alt}
              sizes="
        (max-width: 340px) 80px,
        (max-width: 600px) 86px,
        (max-width: 1440px) 164px,
        220px
        "
              layout="responsive"
            />
          </Media>
        ) : null}
      </PullQuote>
    </Container>
  )
}
