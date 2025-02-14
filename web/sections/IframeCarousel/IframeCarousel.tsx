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
  const { title, hideTitle, items, designOptions } = data
  const { background } = designOptions

  return (
    <BackgroundContainer asSection={true} background={background} {...rest} id={anchor}>
      <div className={twMerge(`pb-page-content`, className)}>
        {title && (
          <Heading
            value={title}
            variant="h3"
            as="h2"
            className={hideTitle ? 'sr-only' : 'pb-lg text-center  max-w-viewport mx-auto px-layout-sm'}
          />
        )}
        <Carousel items={items} displayMode="single" variant="iframe" />
      </div>
    </BackgroundContainer>
  )
}

export default IframeCarousel
