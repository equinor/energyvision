import { Heading, Paragraph } from '@core/Typography'
import { ImageCarouselData } from '../../types/index'
import { Carousel } from '@core/Carousel/Carousel'
import { forwardRef, useId } from 'react'
import getBgClassName from '../../common/helpers/getBackgroundColor'

type ImageCarouselProps = {
  data: ImageCarouselData
  anchor?: string
  className?: string
}

const ImageCarousel = forwardRef<HTMLUListElement, ImageCarouselProps>(function ImageCarousel(
  { anchor, data, className },
  ref,
) {
  const { title, hideTitle, ingress, items, designOptions, options } = data
  const { background } = designOptions
  const headingId = useId()

  return (
    <section id={anchor} className={`${className} ${getBgClassName(background.backgroundUtility)}`}>
      {((title && !hideTitle) || ingress) && (
        <div className="w-full flex flex-col px-layout-lg max-w-viewport mx-auto pb-8">
          {title && !hideTitle && (
            <Heading
              as="h2"
              id={headingId}
              value={title}
              className={`${ingress ? 'pb-6' : ''} text-xl max-w-text text-pretty`}
            />
          )}
          {ingress && <Paragraph value={ingress} className="max-w-text text-pretty" />}
        </div>
      )}
      <Carousel
        ref={ref}
        items={items}
        displayMode="single"
        variant="image"
        hasSectionTitle={title && !hideTitle}
        labelledbyId={title && !hideTitle ? headingId : undefined}
        title={title}
        autoRotation={options?.autoplay}
        sectionTitle={title}
      />
    </section>
  )
})

export default ImageCarousel
