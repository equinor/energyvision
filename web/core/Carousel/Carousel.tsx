import { useId } from '@equinor/eds-utils'
import { ImageWithCaptionData, ImageWithAlt, VideoPlayerCarouselItem, VideoPlayerRatios } from '../../types/types'
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react'
import envisTwMerge from '../../twMerge'
import { MediaButton } from '@core/MediaButton/MediaButton'
import { CarouselVideoItem } from './CarouselVideoItem'
import { CarouselImageItem } from './CarouselImageItem'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

export type DisplayModes = 'single' | 'scroll'
export type Layouts = 'full' | 'default'
type CarouselItemTypes = VideoPlayerCarouselItem | ImageWithCaptionData | ImageWithAlt
type Variants = 'video' | 'image'

type CarouselProps = {
  items: CarouselItemTypes[]
  variant?: Variants
  displayMode?: DisplayModes
  layout?: Layouts
  /* If carousel has a title over it */
  labelledbyId?: string
  className?: string
  listClassName?: string
  autoRotation?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Carousel = forwardRef<HTMLElement, CarouselProps>(function Carousel(
  {
    items,
    variant = 'video',
    displayMode = 'scroll',
    layout = 'full',
    autoRotation = false,
    labelledbyId,
    className = '',
    listClassName = '',
    ...rest
  },
  ref,
) {
  const carouselId = useId('carousel')
  const carouselItemsId = useId('carousel-items')
  const sliderRef = useRef<HTMLUListElement>(null)
  //const itemListRef = useRef(items.map(() => createRef()))
  const itemListRef = useRef<Record<number, HTMLElement>>({})
  //a prefers-reduced-motion user setting must always override autoplay
  const prefersReducedMotion = usePrefersReducedMotion()
  const internalAutoRotation = prefersReducedMotion ? false : autoRotation
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirst = currentIndex === 0
    const newIndex = isFirst ? items?.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    if (itemListRef.current) {
      itemListRef.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }
  const nextSlide = () => {
    const isLast = currentIndex === items?.length - 1
    const newIndex = isLast ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    if (itemListRef.current) {
      itemListRef.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  const layoutClassNames = {
    full: ``,
    default: `px-layout-sm mx-auto max-w-viewport`,
  }

  const ariaLive = internalAutoRotation ? 'off' : 'polite'
  //stop autorotation on hover and focus on a slide
  /*   useEffect(() => {
    if (internalAutoRotation) {
      const next = (currentIndex + 1) % items.length
      const id = setTimeout(() => setCurrentIndex(next), 300)
      return () => clearTimeout(id)
    }
  }, [currentIndex, internalAutoRotation, items.length]) */

  /*TODO:
  visible focus marker
  horizontal scroll offset on next  and prev
*/
  return (
    <section
      ref={ref}
      id={carouselId}
      aria-labelledby={labelledbyId}
      role="group"
      aria-roledescription="carousel"
      className={envisTwMerge(
        `
        px-layout-sm
        max-w-viewport
        m-auto
        flex 
        flex-col-reverse
        ${layoutClassNames[layout]}
        `,
        className,
      )}
    >
      {/* Controls - should be before slide in DOM but not visually */}
      <div className={`pt-6 flex ${internalAutoRotation ? 'justify-between' : 'justify-end'}`}>
        {internalAutoRotation && <MediaButton title={`Play/pause`} mode="play" />}
        <div className="flex gap-2 ">
          <MediaButton
            title={`Go to previous`}
            aria-controls={carouselItemsId}
            mode="previous"
            onClick={() => prevSlide()}
          />
          <MediaButton title={`Go to next`} mode="next" aria-controls={carouselItemsId} onClick={() => nextSlide()} />
        </div>
      </div>
      <ul
        ref={sliderRef}
        className={envisTwMerge(
          `
          relative
          flex
          gap-12
          w-full
          h-full
          overflow-x-scroll
          overflow-y-hidden
          snap-mandatory
          snap-x
           [scrollbar-width:none]
        `,
          listClassName,
        )}
        id={carouselItemsId}
        aria-live={ariaLive}
      >
        {items?.map((item, i, array) => {
          console.log('itemid', item.id)
          const ariaLabel = `${i + 1} of ${items?.length}`
          return variant === 'video' ? (
            <CarouselVideoItem
              key={item.id}
              ref={(element: any) => {
                itemListRef.current[i] = element
              }}
              {...(item as VideoPlayerCarouselItem)}
              displayMode={displayMode}
              aria-label={ariaLabel}
              active={i === currentIndex}
            />
          ) : (
            <CarouselImageItem
              key={item.id}
              ref={(element: any) => {
                itemListRef.current[i] = element
              }}
              {...(item as ImageWithAlt | ImageWithCaptionData)}
              displayMode={displayMode}
              aria-label={ariaLabel}
              active={i === currentIndex}
            />
          )
        })}
      </ul>
    </section>
  )
})
