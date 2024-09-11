import envisTwMerge from '../../twMerge'
import { VideoPlayerCarouselItem, VideoPlayerRatios } from '../../types/index'
import { DisplayModes } from './Carousel'
import { VideoComponentWithCaption } from '../../pageComponents/shared/VideoPlayer'
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
  const aspectRatioUtilityClass = {
    '16:9': 'aspect-video',
    '9:16': 'aspect-9/16',
    '1:1': 'aspect-square',
  }
  return (
    <li
      {...rest}
      ref={ref}
      aria-current={active}
      aria-roledescription="slide"
      className={envisTwMerge(
        `
        transform-all
        shrink-0
        relative
        ${aspectRatioUtilityClass[aspectRatio]}
        ${aspectRatio === VideoPlayerRatios['9:16'] ? 'w-fit' : 'w-[80%]'}
      ${displayMode === 'scroll' ? 'snap-center scroll-ml-6' : ''}
        `,
        className,
      )}
    >
      <VideoComponentWithCaption
        video={video}
        title={title}
        designOptions={{
          aspectRatio,
        }}
        videoControls={{
          playButton: true,
          controls: true,
        }}
      />
    </li>
  )
})
