import { Heading } from '@core/Typography'
import type { IframeCarouselData } from '../../types/index'
import { Carousel } from '@core/Carousel/Carousel'
import { useId } from 'react'
import getBgClassName from '../../common/helpers/getBackgroundColor'

type IframeCarouselProps = {
  data: IframeCarouselData
  anchor?: string
  className?: string
}

const IframeCarousel = ({ data, anchor, className }: IframeCarouselProps) => {
  const { title, hideTitle, items, designOptions } = data
  const { background } = designOptions
  const headingId = useId()

  return (
    <section className={`${className} ${getBgClassName(background.backgroundUtility)}`} id={anchor}>
      {title && (
        <Heading
          value={title}
          variant="h3"
          as="h2"
          id={headingId}
          className={hideTitle ? 'sr-only' : 'pb-lg text-center  max-w-viewport mx-auto px-layout-sm'}
        />
      )}
      <Carousel
        items={items}
        displayMode="single"
        variant="iframe"
        autoRotation={false}
        hasSectionTitle={title && !hideTitle}
        labelledbyId={title && !hideTitle ? headingId : undefined}
      />
    </section>
  )
}

export default IframeCarousel
