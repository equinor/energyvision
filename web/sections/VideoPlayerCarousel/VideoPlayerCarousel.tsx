import { Heading, Paragraph } from '@/core/Typography'
import { VideoPlayerCarouselData } from '../../types/index'
import { Carousel } from '@/core/Carousel/Carousel'
import { forwardRef, useId } from 'react'
import { getBgAndDarkFromDesignOptionBackground } from '@/styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'

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
  const { aspectRatio } = designOptions
  const headingId = useId()
  const { bg, dark } = getBgAndDarkFromDesignOptionBackground(designOptions)

  return (
    <section id={anchor} className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)}>
      <div className="mx-auto flex w-full max-w-viewport flex-col px-layout-lg pb-8">
        {title && (
          <Heading
            id={headingId}
            as="h2"
            value={title}
            className={hideTitle ? 'sr-only' : `${ingress ? 'pb-6' : ''} max-w-text text-xl text-pretty`}
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
