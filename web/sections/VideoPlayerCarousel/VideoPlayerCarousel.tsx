import { Heading, Paragraph } from '@core/Typography'
import { VideoPlayerCarouselData } from '../../types/index'
import { Carousel } from '@core/Carousel/Carousel'
import { forwardRef, useId } from 'react'
import getBgClassName from '../../common/helpers/getBackgroundColor'

type VideoPlayerCarouselProps = {
  data: VideoPlayerCarouselData
  anchor?: string
  className?: string
}

const VideoPlayerCarousel = forwardRef<HTMLUListElement, VideoPlayerCarouselProps>(function VideoPlayerCarousel(
  { anchor, data, className },
  ref,
) {
  const { title, hideTitle, ingress, items, scrollMode, designOptions } = data
  const { background, aspectRatio } = designOptions
  const headingId = useId()

  return (
    <section id={anchor} className={`${className} ${getBgClassName(background.backgroundUtility)}`}>
      <div className="w-full flex flex-col px-layout-lg mx-auto max-w-viewport pb-8">
        {title && (
          <Heading
            id={headingId}
            as="h2"
            value={title}
            className={hideTitle ? 'sr-only' : `${ingress ? 'pb-6' : ''} text-xl max-w-text text-pretty`}
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
        displayMode={scrollMode && scrollMode ? 'scroll' : 'single'}
        hasSectionTitle={!!title}
        variant="video"
        labelledbyId={title ? headingId : undefined}
        autoRotation={false}
      />
    </section>
  )
})

export default VideoPlayerCarousel
