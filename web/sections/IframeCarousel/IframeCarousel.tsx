'use client'
import { useId } from 'react'
import { twMerge } from 'tailwind-merge'
import { Carousel } from '@/core/Carousel/Carousel'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { IframeCarouselData } from '../../types/index'

type IframeCarouselProps = {
  data: IframeCarouselData
  anchor?: string
  className?: string
}

const IframeCarousel = ({
  data,
  anchor,
  className = '',
}: IframeCarouselProps) => {
  const { title, hideTitle, items, designOptions } = data
  const headingId = useId()
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  return (
    <section
      className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)}
      id={anchor}
    >
      {title && (
        <div className='mx-auto max-w-content px-layout-lg'>
          <Blocks
            value={title}
            variant='h2'
            id={headingId}
            blockClassName={` ${hideTitle ? 'sr-only' : ''}`}
          />
        </div>
      )}
      <Carousel
        items={items}
        displayMode='single'
        variant='iframe'
        autoRotation={false}
        hasSectionTitle={title && !hideTitle}
        labelledbyId={title && !hideTitle ? headingId : undefined}
      />
    </section>
  )
}

export default IframeCarousel
