import { PullQuote } from '@components'
import type { QuoteData } from '../../types/types'
import Image from './Image'
import { Ratios } from './SanityImage'

const Quote = ({ data: { quote, authorTitle, author, image, designOptions } }: { data: QuoteData }) => (
  <PullQuote imagePosition={designOptions?.imagePosition || 'left'}>
    <PullQuote.Quote>{quote}</PullQuote.Quote>

    {author && <PullQuote.Author title={authorTitle}>{author}</PullQuote.Author>}

    {image?.asset && (
      <PullQuote.Media>
        <Image
          maxWidth={220}
          aspectRatio={Ratios.ONE_TO_ONE}
          image={image}
          sizes="
              (max-width: 340px) 80px,
              (max-width: 600px) 86px,
              (max-width: 1440px) 164px,
              220px
              "
          layout="responsive"
        />
      </PullQuote.Media>
    )}
  </PullQuote>
)

export default Quote
