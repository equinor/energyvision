import envisTwMerge from '../../twMerge'
import { VideoPlayerCarouselItem, VideoPlayerRatios } from '../../types/types'
import { DisplayModes } from './Carousel'
import { Heading } from '@core/Typography'
import { VideoJsComponent } from '../../pageComponents/shared/VideoPlayer'
import { forwardRef, HTMLAttributes } from 'react'
//import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

type CarouselVideoItemProps = {
  displayMode?: DisplayModes
  className?: string
  active?: boolean
  innerRef?: () => void
} & VideoPlayerCarouselItem &
  Omit<HTMLAttributes<HTMLLIElement>, 'title'>

export const CarouselVideoItem = forwardRef<HTMLLIElement, CarouselVideoItemProps>(function CarouselVideoItem(
  {
    video,
    title,
    displayMode = 'scroll',
    aspectRatio = VideoPlayerRatios['16:9'],
    className = '',
    active = false,
    ...rest
  },
  ref,
) {
  return (
    <li
      {...rest}
      ref={ref}
      role="group"
      aria-current={active}
      aria-hidden={!active}
      aria-roledescription="slide"
      className={envisTwMerge(
        `
        transform-all
        shrink-0
        relative
        ${aspectRatio === VideoPlayerRatios['9:16'] ? 'w-fit' : 'w-[80%]'}
      ${displayMode === 'scroll' ? 'snap-center scroll-ml-6' : ''}
        `,
        className,
      )}
    >
      <VideoJsComponent
        video={video}
        designOptions={{
          aspectRatio,
        }}
        videoControls={{
          playButton: true,
          controls: true,
        }}
      />
      {title && <Heading variant="lg" as="h3" value={title} />}
    </li>
  )
})
