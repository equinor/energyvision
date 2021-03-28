import { PullQuote } from '@components'

export const QuoteRenderer = (child: { node: any }): JSX.Element => {
  const { node } = child
  const { quote, author, image }: { quote: string; author: string; image: any } = node

  return <PullQuote quote={quote} author={author} image={image} />
}
