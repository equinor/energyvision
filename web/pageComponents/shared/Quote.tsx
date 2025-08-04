'use client'
import Image, { getSmallerThanPxLgSizes } from '../../core/SanityImage/SanityImage'
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

  const weight = quote.length < textBoldLimit ? 'font-medium' : 'font-normal'
  const size = quote.length < textSizeLimit ? 'text-3xl' : 'text-md'
  const iconSize = quote.length < textSizeLimit ? 'w-12 h-12' : 'w-9 h-9'

  const ImageComponent = hasImage && (
    <div className="flex justify-center">
      <div className={`${isMobile ? 'w-[81px]' : 'min-w-[194px] md:w-52 xl:w-[242px]'} `}>
        <Image
          maxWidth={242}
          aspectRatio={'1:1'}
          image={image!}
          sizes={getSmallerThanPxLgSizes()}
          className="rounded-full"
        />
      </div>
    </div>
  )

  const AuthorComponent = author && (
    <figcaption className="text-right text-xs">
      <div className="inline-block text-left text-[16px]">
        <div className={authorTitle ? 'font-semibold' : ''}>{author}</div>
        {authorTitle && <div>{authorTitle}</div>}
      </div>
    </figcaption>
  )

  return (
    <figure
      className={`text-grey-90 grid gap-4 dark:text-white-100 ${isMobile ? 'grid-cols-2' : isImageLeft ? 'sm:grid-cols-[auto_1fr]' : 'sm:grid-cols-[1fr_auto]'} `}
    >
      {isMobile ? (
        <>
          {hasImage && (
            <div className="col-span-2 flex items-end gap-3">
              {ImageComponent}
              {AuthorComponent}
            </div>
          )}
          <div className="col-span-2 flex flex-col">
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

          <div className="mr-2 flex flex-col">
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
