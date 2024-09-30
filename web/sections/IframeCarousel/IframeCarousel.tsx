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
  const { title, items, designOptions } = data
  const { background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest} id={anchor}>
      <div className={twMerge(`pb-page-content max-w-viewport mx-auto px-layout-sm`, className)}>
        {title && <Heading value={title} variant="h3" as="h2" className="pb-lg text-center" />}
        <Carousel
          items={items}
          displayMode="scroll"
          variant="iframe"
          className={`px-0 md:px-xs ${items.length !== 2 ? 'lg:px-xs' : 'lg:px-4xl'}`}
        />
      </div>
    </BackgroundContainer>
  )
}

export default IframeCarousel
