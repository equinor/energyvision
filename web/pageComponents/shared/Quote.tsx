import { PullQuote } from '@components'
import type { QuoteData } from '../../types/index'
import Image, { Ratios } from './SanityImage'

const Quote = ({ data: { quote, authorTitle, author, image, designOptions } }: { data: QuoteData }) => (
  <PullQuote imagePosition={designOptions?.imagePosition || 'left'}>
    <PullQuote.Quote>{quote}</PullQuote.Quote>

    {author && <PullQuote.Author title={authorTitle}>{author}</PullQuote.Author>}

    {image?.asset && (
      <PullQuote.Media>
        <Image
          maxWidth={242}
          aspectRatio={Ratios.ONE_TO_ONE}
          image={image}
          sizes="(min-width: 2280px) 242px, (min-width: 800px) calc(3.29vw + 168px), calc(1.67vw + 75px)"
        />
      </PullQuote.Media>
    )}
  </PullQuote>
)

export default Quote
