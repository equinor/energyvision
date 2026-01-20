import { forwardRef, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import { Carousel } from '@/core/Carousel/Carousel'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'

type ImageCarouselProps = {
  data: any
  anchor?: string
  className?: string
}

const ImageCarousel = forwardRef<HTMLUListElement, ImageCarouselProps>(
  function ImageCarousel({ anchor, data, className }, ref) {
    const { title, hideTitle, ingress, items, designOptions, options } = data
    const { bg, dark } = getBgAndDarkFromBackground(designOptions)
    const headingId = useId()

    return (
      <section
        id={anchor}
        className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)}
      >
        {((title && !hideTitle) || ingress) && (
          <div className='flex w-full flex-col px-layout-lg pb-8'>
            {title && !hideTitle && (
              <Blocks variant='h2' id={headingId} value={title} />
            )}
            {ingress && <Blocks variant='ingress' value={ingress} />}
          </div>
        )}
        <Carousel
          ref={ref}
          items={items}
          displayMode='single'
          variant='image'
          hasSectionTitle={title && !hideTitle}
          labelledbyId={title && !hideTitle ? headingId : undefined}
          title={title}
          autoRotation={options?.autoplay}
          sectionTitle={title}
        />
      </section>
    )
  },
)

export default ImageCarousel
