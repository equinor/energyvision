import Image, { Ratios } from './SanityImage'
import type { ImageWithAlt, DesignOptions } from '../../types/index'
import { QuoteSymbol } from '../../icons'

const textBoldLimit = 160
const textSizeLimit = 50

export type ImagePosition = 'left' | 'right'

type QuoteData = {
  type: string
  id: string
  author: string
  authorTitle?: string
  quote: string
  image?: ImageWithAlt
  designOptions: DesignOptions & { imagePosition?: ImagePosition }
}

const Quote = ({ data: { quote, authorTitle, author, image, designOptions } }: { data: QuoteData }) => {
  if (!quote) return null
  const imagePosition = designOptions?.imagePosition || 'right'
  const isImageLeft = imagePosition === 'left'

  const weight = quote.length < textBoldLimit ? 'font-semibold' : 'font-normal'
  const size = quote.length < textSizeLimit ? 'text-2xl' : 'text-lg'
  const iconSize = quote.length < textSizeLimit ? 'w-12 h-12' : 'w-9 h-9'

  return (
    <figure
      className={`grid items-center gap-4 sm:gap-x-6 text-gray-900 ${
        isImageLeft ? 'grid-cols-[auto_1fr]' : 'grid-cols-[1fr_auto]'
      }`}
    >
      {image?.asset && isImageLeft && (
        <div className="row-span-2 flex justify-center">
          <Image
            maxWidth={242}
            aspectRatio={Ratios.ONE_TO_ONE}
            image={image}
            sizes="(min-width: 2280px) 242px, (min-width: 800px) calc(3.29vw + 168px), calc(1.67vw + 75px)"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col space-y-3">
        <QuoteSymbol iconSize={iconSize} />
        <blockquote className={`italic ${weight} ${size}`}>{quote}</blockquote>
      </div>

      {image?.asset && !isImageLeft && (
        <div className="row-span-2 flex justify-center">
          <Image
            maxWidth={242}
            aspectRatio={Ratios.ONE_TO_ONE}
            image={image}
            sizes="(min-width: 2280px) 242px, (min-width: 800px) calc(3.29vw + 168px), calc(1.67vw + 75px)"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
          />
        </div>
      )}

      {author && (
        <figcaption className="text-sm font-semibold text-gray-700 text-right self-start sm:self-end">
          <strong>{author}</strong>
          {authorTitle && <span className="block text-gray-500">{authorTitle}</span>}
        </figcaption>
      )}
    </figure>
  )
}

export default Quote
