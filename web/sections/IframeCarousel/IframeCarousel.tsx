import { BackgroundContainer } from '@components'
import { Heading } from '@core/Typography'
import type { IframeCarouselData } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { Carousel } from '@core/Carousel/Carousel'

type IframeCarouselProps = {
  data: IframeCarouselData
  anchor?: string
  className?: string
}

const IframeCarousel = ({ data, anchor, className, ...rest }: IframeCarouselProps) => {
  const { title, hideTitle, items, singleMode, useFullWidthScroll, designOptions } = data
  const { background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest} id={anchor}>
      <div className={twMerge(`pb-page-content`, className)}>
        {title && (
          <Heading
            value={title}
            variant="h3"
            as="h2"
            className={hideTitle ? 'sr-only' : 'pb-lg text-center  max-w-viewport mx-auto px-layout-sm'}
          />
        )}
        <Carousel
          items={items}
          displayMode={singleMode && singleMode ? 'single' : 'scroll'}
          variant="iframe"
          {...(!singleMode && {
            layout: useFullWidthScroll ? 'full' : 'default',
          })}
        />
      </div>
    </BackgroundContainer>
  )
}

export default IframeCarousel
