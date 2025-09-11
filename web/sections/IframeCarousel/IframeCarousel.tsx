import type { IframeCarouselData } from '../../types/index'
import { Carousel } from '@/core/Carousel/Carousel'
import { useId } from 'react'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'

type IframeCarouselProps = {
  data: IframeCarouselData
  anchor?: string
  className?: string
}

const IframeCarousel = ({ data, anchor, className = '' }: IframeCarouselProps) => {
  const { title, hideTitle, items, designOptions } = data
  const headingId = useId()
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  return (
    <section className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)} id={anchor}>
      {title && (
        <Blocks
          value={title}
          variant="h2"
          id={headingId}
          blockClassName={`px-layout-lg ${hideTitle ? 'sr-only' : ''}`}
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
