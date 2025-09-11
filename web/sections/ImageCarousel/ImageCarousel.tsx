import { ImageCarouselData } from '../../types/index'
import { BackgroundContainer } from '@/core/Backgrounds'
import { Carousel } from '@/core/Carousel/Carousel'
import Blocks from '@/portableText/Blocks'
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
    <BackgroundContainer as="section" background={background} id={anchor} backgroundStyle="none" className={className}>
      {((title && !hideTitle) || ingress) && (
        <div className="mx-auto flex w-full flex-col px-layout-lg pb-8">
          {title && !hideTitle && <Blocks variant="h2" id={headingId} value={title} />}
          {ingress && <Blocks variant="ingress" value={ingress} />}
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
    </BackgroundContainer>
  )
})

export default ImageCarousel
