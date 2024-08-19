import { Heading, Paragraph } from '@core/Typography'
import envisTwMerge from '../../twMerge'
import { VideoPlayerCarouselData } from '../../types/types'
import { BackgroundContainer } from '@components'
import { Carousel } from '@core/Carousel/Carousel'
import { forwardRef, useId } from 'react'

type VideoPlayerCarouselProps = {
  data: VideoPlayerCarouselData
  anchor?: string
  className?: string
}

const VideoPlayerCarousel = forwardRef<HTMLUListElement, VideoPlayerCarouselProps>(function VideoPlayerCarousel(
  { anchor, data, className },
  ref,
) {
  const { title, ingress, items, designOptions } = data
  const { background, aspectRatio } = designOptions
  const headingId = useId()

  return (
    <BackgroundContainer background={background} id={anchor} className={envisTwMerge(`pb-page-content`, className)}>
      <div className="w-full flex flex-col px-layout-lg mx-auto max-w-viewport pb-8">
        {title && (
          <Heading
            id={headingId}
            as="h2"
            value={title}
            className={`${ingress ? 'pb-6' : ''} text-xl max-w-text text-pretty`}
          />
        )}
        {ingress && <Paragraph value={ingress} className="max-w-text text-pretty" />}
      </div>
      <Carousel
        ref={ref}
        items={items.map((item) => {
          return {
            ...item,
            aspectRatio: aspectRatio,
          }
        })}
        hasSectionTitle={!!title}
        variant="video"
        labelledbyId={title ? headingId : undefined}
        autoRotation={false}
      />
    </BackgroundContainer>
  )
})

export default VideoPlayerCarousel
