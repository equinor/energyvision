import envisTwMerge from '../../twMerge'
import { VideoPlayerCarouselItem, VideoPlayerRatios } from '../../types/types'
import { DisplayModes } from './Carousel'
import { Heading } from '@core/Typography'
import { VideoJsComponent } from '../../pageComponents/shared/VideoPlayer'
import { HTMLAttributes } from 'react'
//import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

type CarouselType = {
  displayMode?: DisplayModes
  className?: string
  active?: boolean
  innerRef?: () => void
} & VideoPlayerCarouselItem &
  Omit<HTMLAttributes<HTMLLIElement>, 'title'>

export const CarouselVideoItem = ({
  video,
  title,
  displayMode = 'scroll',
  aspectRatio = VideoPlayerRatios['16:9'],
  className = '',
  innerRef,
  active = false,
  ...rest
}: CarouselType) => {
  {
    /**         ${!active && displayMode === 'single' ? 'opacity-60' : ''} */
  }
  return (
    <li
      {...rest}
      role="group"
      aria-roledescription="slide"
      className={envisTwMerge(
        `
        transform-all
        shrink-0
        relative
        w-[70%]
      ${displayMode === 'scroll' ? 'snap-start scroll-ml-6' : ''}
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
}
