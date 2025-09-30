import { DesignOptions } from '../../types/index'
import { Carousel } from '@/core/Carousel/Carousel'
import { forwardRef, useId } from 'react'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'
import { VideoType } from '@/core/VideoJsPlayer/VideoPlayer'
import { PortableTextBlock } from 'next-sanity'
import { AspectRatioVariants } from '@/core/VideoJsPlayer/Video'
import Blocks from '@/portableText/Blocks'

export type VideoPlayerCarouselItem = {
  id: string
  video: VideoType
  title?: PortableTextBlock[]
  hideVideoTitle?: boolean
  aspectRatio?: AspectRatioVariants
}

export type VideoPlayerCarouselData = {
  id: string
  type: string
  items: VideoPlayerCarouselItem[]
  designOptions: DesignOptions & {
    aspectRatio: AspectRatioVariants
  }
  title?: PortableTextBlock[]
  hideTitle?: boolean
  ingress?: PortableTextBlock[]
}

type VideoPlayerCarouselProps = {
  data: VideoPlayerCarouselData
  anchor?: string
  className?: string
}

const VideoPlayerCarousel = forwardRef<HTMLUListElement, VideoPlayerCarouselProps>(function VideoPlayerCarousel(
  { anchor, data, className },
  ref,
) {
  const { title, hideTitle, ingress, items, designOptions } = data
  const { aspectRatio } = designOptions
  const headingId = useId()
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  const scrollMode = designOptions?.aspectRatio === '9:16'

  return (
    <section id={anchor} className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)}>
      <div className="flex w-full flex-col px-layout-lg pb-8">
        {title && (
          <Blocks
            id={headingId}
            variant="h2"
            value={title}
            className={hideTitle ? 'sr-only' : `${ingress ? 'pb-6' : ''}`}
          />
        )}
        {ingress && <Blocks variant="ingress" value={ingress} />}
      </div>
      <Carousel
        ref={ref}
        items={items.map((item: VideoPlayerCarouselItem) => {
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
        containerClassName={`${scrollMode ? 'px-layout-sm lg:px-layout-md' : ''}`}
      />
    </section>
  )
})

export default VideoPlayerCarousel
