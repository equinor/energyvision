import { PullQuote } from '@components'
import Img from 'next/image'
import { imageProps } from '../helpers'
import styled from 'styled-components'
import type { ImageWithAlt } from '../../types/types'

const { Quote, Author, Media } = PullQuote
const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-small) 0 var(--layout-paddingHorizontal-medium);
  max-width: var(--maxViewportWidth);
  margin: var(--space-xxLarge) auto;
`

export const QuoteRenderer = (child: { node: any }): JSX.Element => {
  const { node } = child
  const {
    quote,
    author,
    authorTitle,
    image,
  }: { quote: string; author: string; authorTitle: string; image: ImageWithAlt } = node
  return (
    <Container>
      <PullQuote>
        <Quote>{quote}</Quote>
        <Author title={authorTitle}>{author}</Author>

        {image ? (
          <Media>
            <Img {...imageProps(image, 400, 1)} alt={image.alt} />
          </Media>
        ) : null}
      </PullQuote>
    </Container>
  )
}
