import { Heading } from '@core/Typography'
import envisTwMerge from '../../twMerge'
import { ImageCarouselData } from '../../types/types'
import { BackgroundContainer } from '@components'
import { useId } from '@equinor/eds-utils'
import { Carousel } from '@core/Carousel/Carousel'
import { forwardRef } from 'react'

type ImageCarouselProps = {
  data: ImageCarouselData
  anchor?: string
  className?: string
}

const ImageCarousel = forwardRef<HTMLUListElement, ImageCarouselProps>(function ImageCarousel(
  { anchor, data, className },
  ref,
) {
  const { title, items, designOptions, options } = data
  const { background } = designOptions
  const headingId = useId('image-carousel-heading')

  return (
    <BackgroundContainer background={background} id={anchor} className={envisTwMerge(`pb-page-content`, className)}>
      {title && <Heading id={headingId} value={title} className="pb-2" />}
      <Carousel
        ref={ref}
        items={items}
        displayMode="single"
        variant="image"
        layout="full"
        labelledbyId={headingId}
        autoRotation={options?.autoplay}
      />
    </BackgroundContainer>
  )
})

export default ImageCarousel
