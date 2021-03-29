import { PullQuote } from '@components'

export const QuoteRenderer = (child: { node: any }): JSX.Element => {
  const { node } = child
  const { quote, author, authorTitle, image }: { quote: string; author: string; authorTitle: string; image: any } = node

  return <PullQuote quote={quote} author={author} authorTitle={authorTitle} image={image} />
}
