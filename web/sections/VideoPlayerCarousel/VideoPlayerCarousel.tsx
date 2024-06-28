import { Heading } from '@core/Typography'
import envisTwMerge from '../../twMerge'
import { VideoPlayerCarouselData } from '../../types/types'
import { BackgroundContainer } from '@components'
import { useId } from '@equinor/eds-utils'
import { Carousel } from '@core/Carousel/Carousel'

const VideoPlayerCarousel = ({
  anchor,
  data,
  className,
}: {
  data: VideoPlayerCarouselData
  anchor?: string
  className?: string
}) => {
  const { title, items, designOptions } = data
  const { background, aspectRatio } = designOptions
  const headingId = useId('video-carousel-heading')

  return (
    <BackgroundContainer background={background} id={anchor} className={envisTwMerge(`pb-page-content`, className)}>
      {title && <Heading id={headingId} value={title} className="pb-2" />}
      <Carousel
        items={items.map((item) => {
          return {
            ...item,
            aspectRatio: aspectRatio,
          }
        })}
        aspectRatio={aspectRatio}
        displayMode="single"
        variant="video"
        layout="full"
        labelledbyId={headingId}
        autoRotation={false}
      />
    </BackgroundContainer>
  )
}

export default VideoPlayerCarousel
