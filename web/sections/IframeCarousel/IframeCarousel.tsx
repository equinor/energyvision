import { BackgroundContainer } from '@core/Backgrounds'
import { Heading } from '@core/Typography'
import type { IframeCarouselData } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { Carousel } from '@core/Carousel/Carousel'
import { useId } from 'react'

type IframeCarouselProps = {
  data: IframeCarouselData
  anchor?: string
  className?: string
}

const IframeCarousel = ({ data, anchor, className, ...rest }: IframeCarouselProps) => {
  const { title, hideTitle, items, designOptions } = data
  const { background } = designOptions
  const headingId = useId()

  return (
    <BackgroundContainer
      as="section"
      background={background}
      backgroundStyle="none"
      className={className}
      {...rest}
      id={anchor}
    >
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
    </BackgroundContainer>
  )
}

export default IframeCarousel
