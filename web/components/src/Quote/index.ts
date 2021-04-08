import { PullQuote as PullQuoteWrapper } from './PullQuote'
import { Media } from './Media'
import { Author } from './Author'
import { Quote } from './Quote'

type PullQuoteCompoundProps = typeof PullQuoteWrapper & {
  Media: typeof Media
  Author: typeof Author
  Quote: typeof Quote
}

const PullQuote = PullQuoteWrapper as PullQuoteCompoundProps

PullQuote.Media = Media
PullQuote.Author = Author
PullQuote.Quote = Quote

export { PullQuote }
export * from './BlockQuote'
