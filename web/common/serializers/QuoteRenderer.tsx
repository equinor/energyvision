import { PullQuote } from '@components'
import Img from 'next/image'
import { imageProps } from '../helpers'

export const QuoteRenderer = (child: { node: any }): JSX.Element => {
  const { node } = child
  const { quote, author, authorTitle, image }: { quote: string; author: string; authorTitle: string; image: any } = node

  return (
    <PullQuote quote={quote}>
      <PullQuote.Quote text={quote} />
      <PullQuote.Author name={author} title={authorTitle} />

      {image ? (
        <PullQuote.Media>
          <Img {...imageProps(image.asset, 300, 1)} alt={image.alt} layout="intrinsic" />
        </PullQuote.Media>
      ) : null}
    </PullQuote>
  )
}
