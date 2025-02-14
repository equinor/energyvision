import Image, { Ratios } from './SanityImage'
import type { ImageWithAlt, DesignOptions } from '../../types/index'
import { QuoteSymbol } from '../../icons'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'

const textBoldLimit = 160
const textSizeLimit = 50

type QuoteData = {
  type: string
  id: string
  author: string
  authorTitle?: string
  quote: string
  image?: ImageWithAlt
  designOptions: DesignOptions & { imagePosition?: 'left' | 'right' }
}

const Quote = ({ data: { quote, authorTitle, author, image, designOptions } }: { data: QuoteData }) => {
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  if (!quote) return null
  const isImageLeft = (designOptions?.imagePosition || 'left') === 'left'
  const hasImage = Boolean(image?.asset)

  const weight = quote.length < textBoldLimit ? 'font-semibold' : 'font-normal'
  const size = quote.length < textSizeLimit ? 'text-3xl' : 'text-lg'
  const iconSize = quote.length < textSizeLimit ? 'w-12 h-12' : 'w-9 h-9'

  const ImageComponent = hasImage && (
    <div className="flex justify-center">
      <Image
        maxWidth={242}
        aspectRatio={Ratios.ONE_TO_ONE}
        image={image!}
        sizes="(min-width: 2280px) 242px, (min-width: 800px) calc(3.29vw + 168px), 80px"
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
      />
    </div>
  )

  const AuthorComponent = author && (
    <figcaption
      className={`text-xs text-left sm:text-right sm:self-end ${!hasImage ? 'col-span-2 sm:col-span-1' : ''}`}
    >
      <span className={`${authorTitle ? 'font-bold' : ''}`}>{author}</span>
      {authorTitle && <span className="block text-gray-500">{authorTitle}</span>}
    </figcaption>
  )

  return (
    <figure
      className={`grid gap-4 text-gray-700 
        ${isMobile ? 'grid-cols-2' : isImageLeft ? 'sm:grid-cols-[auto_1fr]' : 'sm:grid-cols-[1fr_auto]'}
      `}
    >
      {isMobile ? (
        <>
          {hasImage && (
            <div className="flex items-end col-span-2 gap-3">
              {ImageComponent}
              {AuthorComponent}
            </div>
          )}
          <div className="col-span-2 flex flex-col space-y-3">
            <QuoteSymbol iconSize={iconSize} />
            <blockquote className={`italic ${weight} ${size}`}>{quote}</blockquote>
          </div>
          {!hasImage && AuthorComponent}
        </>
      ) : (
        <>
          {isImageLeft && hasImage && (
            <div className="flex flex-col items-center self-center sm:row-span-2">{ImageComponent}</div>
          )}

          <div className="flex flex-col space-y-3">
            <QuoteSymbol iconSize={iconSize} />
            <blockquote className={`italic ${weight} ${size}`}>{quote}</blockquote>
          </div>

          {!isImageLeft && hasImage && (
            <div className="flex flex-col items-center self-center sm:row-span-2">{ImageComponent}</div>
          )}

          <div
            className={`${
              hasImage ? (isImageLeft ? 'sm:col-start-2' : 'sm:col-start-1') : 'col-span-2 sm:col-span-1'
            } sm:row-start-2`}
          >
            {AuthorComponent}
          </div>
        </>
      )}
    </figure>
  )
}

export default Quote
