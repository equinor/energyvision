import { BackgroundContainer } from '@/core/Backgrounds'
import type { IframeCarouselData } from '../../types/index'
import { Carousel } from '@/core/Carousel/Carousel'
import { useId } from 'react'
import Blocks from '@/portableText/Blocks'

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
        <Blocks
          value={title}
          variant="h2"
          id={headingId}
          className={hideTitle ? 'sr-only' : 'max-w-viewport px-layout-sm'}
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
