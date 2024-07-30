import { useId } from '@equinor/eds-utils'
import { ImageWithCaptionData, ImageWithAlt, VideoPlayerCarouselItem } from '../../types/types'
import { forwardRef, HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

const TRANSLATE_X_AMOUNT = 1000

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const itemListRef = useRef<Record<number, HTMLElement>>({})
  //a prefers-reduced-motion user setting must always override autoplay
  const prefersReducedMotion = usePrefersReducedMotion()
  const internalAutoRotation = prefersReducedMotion ? false : autoRotation
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentXPosition, setCurrentXPosition] = useState(0)
  const [currentListTranslateX, setCurrentListTranslateX] = useState(0)
  const [pauseAutoRotation, setPauseAutoRotation] = useState(false)
  //[0, 1000, 2000, -1000]
  const initialPositions = useMemo(() => {
    return items.map((item, i) => {
      if (i === items.length - 1) {
        return -TRANSLATE_X_AMOUNT
      }
      return TRANSLATE_X_AMOUNT * i
    })
  }, [items])
  const [itemsXPositions, setItemsXPositions] = useState(initialPositions)
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

  const loopSlideNext = useCallback(() => {
    console.log('Go to next')
    const isLast = currentIndex === items?.length - 1
    const newIndex = isLast ? 0 : currentIndex + 1
    const newXPosition = currentXPosition + TRANSLATE_X_AMOUNT
    const higestLastItemTranslateXPosition = Math.max(...itemsXPositions)
    if (newXPosition === higestLastItemTranslateXPosition) {
      const newPositions = itemsXPositions.map((position, i) => {
        if (newIndex === items?.length - 1 && i === 0) {
          return higestLastItemTranslateXPosition + TRANSLATE_X_AMOUNT
        } else if (i === newIndex + 1) {
          return higestLastItemTranslateXPosition + TRANSLATE_X_AMOUNT
        }
        return position
      })
      setItemsXPositions(newPositions)
    }

    //move the ul slider
    const newTranslateX = currentListTranslateX - TRANSLATE_X_AMOUNT
    setCurrentListTranslateX(newTranslateX)
    setCurrentIndex(newIndex)
    setCurrentXPosition(newXPosition)
  }, [currentIndex, currentListTranslateX, currentXPosition, items?.length, itemsXPositions, setCurrentListTranslateX])

  const loopSlidePrev = () => {
    console.log('Go to previous')
    const isFirst = currentIndex === 0
    const newIndex = isFirst ? items?.length - 1 : currentIndex - 1
    const newXPosition = currentXPosition - TRANSLATE_X_AMOUNT
    const lowestLastItemTranslateXPosition = Math.min(...itemsXPositions)
    if (newXPosition === lowestLastItemTranslateXPosition) {
      const newPositions = itemsXPositions.map((position, i) => {
        if (newIndex === 0 && i === 3) {
          return lowestLastItemTranslateXPosition - TRANSLATE_X_AMOUNT
        } else if (i === newIndex - 1) {
          return lowestLastItemTranslateXPosition - TRANSLATE_X_AMOUNT
        }
        return position
      })
      setItemsXPositions(newPositions)
    }
    //move the ul slider
    const newTranslateX = currentListTranslateX + TRANSLATE_X_AMOUNT
    setCurrentListTranslateX(newTranslateX)
    setCurrentIndex(newIndex)
    setCurrentXPosition(newXPosition)
  }

  const layoutClassNames = {
    full: ``,
    default: `px-layout-sm mx-auto max-w-viewport`,
  }

  const listVariantClassName = {
    video: 'flex gap-12 w-full h-full overflow-y-hidden',
    image: `${
      displayMode === 'single'
        ? 'grid w-[min-content] transition-transform ease-scroll delay-0 duration-[800ms]'
        : 'flex gap-12 w-full h-full overflow-y-hidden'
    }`,
  }
  const listDisplayModeClassName = {
    scroll: 'snap-mandatory snap-x overflow-x-scroll',
    single: ``,
  }

  const ariaLive = autoRotation ? 'off' : 'polite'

  //stop autorotation on focus on a slide
  useEffect(() => {
    if (internalAutoRotation && !pauseAutoRotation) {
      timeoutRef.current = setTimeout(() => loopSlideNext(), 6000) // + 1s from the play/pause button timer
      return () => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
      }
    }
  }, [internalAutoRotation, loopSlideNext, pauseAutoRotation])

  const cancelTimeout = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }

  return (
    <section
      ref={ref}
      id={carouselId}
      aria-labelledby={labelledbyId}
      role="group"
      aria-roledescription="carousel"
      className={envisTwMerge(
        `relative
        ${
          variant === 'image' && displayMode === 'single'
            ? 'overflow-hidden grid grid-flow-row'
            : 'px-layout-sm flex flex-col-reverse max-w-viewport'
        }
        ${layoutClassNames[layout]}
        `,
        className,
      )}
    >
      {/* Controls - should be before slide in DOM but not visually */}
      <div
        className={`${
          variant === 'image' && displayMode === 'single'
            ? 'w-[980px] mx-auto col-start-1 col-end-1 row-start-2 row-end-2'
            : ''
        } pt-6 flex ${internalAutoRotation ? 'justify-between' : 'justify-end'}`}
      >
        {internalAutoRotation && (
          <MediaButton
            key={`play_pause_button_${currentIndex}`}
            title={pauseAutoRotation ? `Play our image gallery` : `Pause image gallery`}
            mode={pauseAutoRotation ? 'pause' : 'play'}
            onClick={() => {
              setPauseAutoRotation(!pauseAutoRotation)
            }}
            paused={pauseAutoRotation}
            useTimer
          />
        )}
        <div className="flex gap-3 items-center">
          <MediaButton
            title={`Go to previous`}
            aria-controls={carouselItemsId}
            mode="previous"
            onClick={() => (variant === 'image' && displayMode === 'single' ? loopSlidePrev() : prevSlide())}
          />
          <span className="text-sm">{`${currentIndex + 1}/${items?.length}`}</span>
          <MediaButton
            title={`Go to next`}
            mode="next"
            aria-controls={carouselItemsId}
            onClick={() => (variant === 'image' && displayMode === 'single' ? loopSlideNext() : nextSlide())}
          />
        </div>
      </div>
      <ul
        ref={sliderRef}
        className={envisTwMerge(
          `
          [scrollbar-width:none]
          transition-all
          m-auto
          ${listDisplayModeClassName[displayMode]}
          ${listVariantClassName[variant]}
        `,
          listClassName,
        )}
        {...(variant === 'image' &&
          displayMode === 'single' && {
            style: {
              transform: `translate3d(${currentListTranslateX}px, 0px, 0px)`,
            },
          })}
        id={carouselItemsId}
        aria-live={ariaLive}
      >
        {items?.map((item, i, array) => {
          const ariaLabel = `${i + 1} of ${items?.length}`
          return variant === 'video' ? (
            <CarouselVideoItem
              key={item.id ?? `${carouselId}_${i + 1}`}
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
              key={item.id ?? `${carouselId}_${i + 1}`}
              ref={(element: any) => {
                itemListRef.current[i] = element
              }}
              {...(item as ImageWithAlt | ImageWithCaptionData)}
              displayMode={displayMode}
              aria-label={ariaLabel}
              active={i === currentIndex}
              {...(variant === 'image' &&
                displayMode === 'single' && {
                  style: {
                    transform: `translate3d(${itemsXPositions[i]}px, 0px, 0px)`,
                  },
                })}
              onFocus={() => {
                console.log('in focus, cancel timeout')
                cancelTimeout()
              }}
            />
          )
        })}
      </ul>
    </section>
  )
})
