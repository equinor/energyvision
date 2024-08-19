import { Heading, Paragraph } from '@core/Typography'
import envisTwMerge from '../../twMerge'
import { ImageCarouselData } from '../../types/types'
import { BackgroundContainer } from '@components'
import { Carousel } from '@core/Carousel/Carousel'
import { forwardRef, useId } from 'react'

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
    <BackgroundContainer background={background} id={anchor} className={envisTwMerge(`pb-page-content`, className)}>
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
      <Carousel
        ref={ref}
        items={items}
        displayMode={items?.length < 3 ? 'scroll' : 'single'}
        variant="image"
        hasSectionTitle={!!title}
        labelledbyId={title ? headingId : undefined}
        title={title}
        autoRotation={options?.autoplay}
      />
    </BackgroundContainer>
  )
})

export default ImageCarousel
