import { VideoPlayerCarouselItem, ImageCarouselItem } from '../../types/types'
import { forwardRef, HTMLAttributes, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import envisTwMerge from '../../twMerge'
import { MediaButton } from '@core/MediaButton/MediaButton'
import { CarouselVideoItem } from './CarouselVideoItem'
import { CarouselImageItem } from './CarouselImageItem'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'
import { PortableTextBlock } from '@portabletext/types'
import { toPlainText } from '@portabletext/react'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'

export type DisplayModes = 'single' | 'scroll'
export type Layouts = 'full' | 'default'
type CarouselItemTypes = VideoPlayerCarouselItem | ImageCarouselItem
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
  title?: PortableTextBlock[]
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>

const TRANSLATE_X_AMOUNT_LG = 1000
const TRANSLATE_X_AMOUNT_SM = 295
const TRANSLATE_X_AMOUNT_MD = 712

export const Carousel = forwardRef<HTMLElement, CarouselProps>(function Carousel(
  {
    items,
    variant = 'video',
    displayMode = 'scroll',
    //layout = 'full',
    autoRotation = false,
    labelledbyId,
    title,
    className = '',
    listClassName = '',
  },
  ref,
) {
  //TODO translations
  const carouselItemsId = useId()
  const controlsId = useId()
  const sliderRef = useRef<HTMLUListElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  //a prefers-reduced-motion user setting must always override autoplay
  const prefersReducedMotion = usePrefersReducedMotion()
  const internalAutoRotation = prefersReducedMotion ? false : autoRotation
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentXPosition, setCurrentXPosition] = useState(0)
  const [currentListTranslateX, setCurrentListTranslateX] = useState(0)
  const [pauseAutoRotation, setPauseAutoRotation] = useState(false)
  let TRANSLATE_X_AMOUNT = TRANSLATE_X_AMOUNT_SM
  const isMedium = useMediaQuery(`(min-width: 768px)`)
  const isLarge = useMediaQuery(`(min-width: 1024px)`)
  if (isMedium) {
    TRANSLATE_X_AMOUNT = TRANSLATE_X_AMOUNT_MD
  }
  if (isLarge) {
    TRANSLATE_X_AMOUNT = TRANSLATE_X_AMOUNT_LG
  }

  const initialPositions = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return items.map((item, i) => {
      if (i === items.length - 1) {
        return -TRANSLATE_X_AMOUNT
      }
      return TRANSLATE_X_AMOUNT * i
    })
  }, [TRANSLATE_X_AMOUNT, items])

  const [itemsXPositions, setItemsXPositions] = useState<number[]>([])

  const prevSlide = () => {
    const isFirst = currentIndex === 0
    const newIndex = isFirst ? items?.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    if (sliderRef?.current) {
      const noOfItems = sliderRef?.current?.childElementCount
      const itemWidth = sliderRef?.current?.lastElementChild?.clientWidth || 0
      const padding = (sliderRef?.current?.scrollWidth - itemWidth * noOfItems) / (noOfItems - 1)
      const calculatedOffset = itemWidth + padding / 2

      sliderRef?.current.scrollBy({
        left: -calculatedOffset,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }
  }

  const nextSlide = () => {
    const isLast = currentIndex === items?.length - 1
    const newIndex = isLast ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    if (sliderRef?.current) {
      const noOfItems = sliderRef?.current?.childElementCount
      const itemWidth = sliderRef?.current?.lastElementChild?.clientWidth || 0
      const padding = (sliderRef?.current?.scrollWidth - itemWidth * noOfItems) / (noOfItems - 1)
      const calculatedOffset = itemWidth + padding / 2

      sliderRef?.current.scrollBy({
        left: calculatedOffset,
        behavior: 'smooth',
      })
    }
  }

  const loopSlideNext = useCallback(() => {
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
  }, [TRANSLATE_X_AMOUNT, currentIndex, currentListTranslateX, currentXPosition, items?.length, itemsXPositions])

  const loopSlidePrev = useCallback(() => {
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
  }, [TRANSLATE_X_AMOUNT, currentIndex, currentListTranslateX, currentXPosition, items?.length, itemsXPositions])

  useEffect(() => {
    if (internalAutoRotation && !pauseAutoRotation) {
      timeoutRef.current = setTimeout(() => loopSlideNext(), 6000) // + 1s from the play/pause button timer
      return () => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
      }
    }
  }, [internalAutoRotation, loopSlideNext, pauseAutoRotation])

  useEffect(() => {
    const reset = () => {
      setCurrentIndex(0)
      setCurrentXPosition(0)
      setCurrentListTranslateX(0)
      setItemsXPositions(initialPositions)
    }
    reset()
  }, [initialPositions])

  const cancelTimeout = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }

  const listVariantClassName = {
    video: 'flex gap-3 lg:gap-12 w-full h-full overflow-y-hidden',
    image: `${
      displayMode === 'single'
        ? 'grid transition-transform ease-scroll delay-0 duration-[800ms]'
        : 'flex gap-3 md:gap-8 lg:gap-12 w-full h-full overflow-y-hidden'
    }`,
  }
  const listDisplayModeClassName = {
    scroll: 'snap-mandatory snap-x overflow-x-scroll',
    single: ``,
  }

  return (
    <section
      ref={ref}
      {...(labelledbyId && {
        'aria-labelledby': labelledbyId,
      })}
      {...(!labelledbyId &&
        title && {
          'aria-label': toPlainText(title),
        })}
      aria-roledescription="carousel"
      className={envisTwMerge(
        `relative
        ${
          variant === 'image' && displayMode === 'single'
            ? 'overflow-hidden grid grid-flow-row'
            : 'px-6 lg:px-layout-sm flex flex-col-reverse max-w-viewport'
        }
        `,
        className,
      )}
    >
      {/* Controls - should be before slide in DOM but not visually */}
      <div
        role="group"
        aria-labelledby={controlsId}
        className={`${
          variant === 'image' && displayMode === 'single'
            ? 'w-[var(--image-carousel-card-w-sm)] md:w-[var(--image-carousel-card-w-md)] lg:w-[var(--image-carousel-card-w-lg)] mx-auto col-start-1 col-end-1 row-start-2 row-end-2'
            : ''
        } pt-6 pb-2 flex ${internalAutoRotation ? 'justify-between' : 'justify-end'}`}
      >
        <div id={controlsId} className="sr-only">{`Carousel controls`}</div>
        {internalAutoRotation && (
          <MediaButton
            key={`play_pause_button_${currentIndex}`}
            title={pauseAutoRotation ? `Play our image gallery.` : `Pause image gallery`}
            mode={pauseAutoRotation ? 'play' : 'pause'}
            onClick={() => {
              setPauseAutoRotation(!pauseAutoRotation)
            }}
            paused={pauseAutoRotation}
            useTimer
          />
        )}
        <div className="flex gap-3 items-center">
          <MediaButton
            title={`Go to slide `}
            aria-controls={carouselItemsId}
            mode="previous"
            onClick={() => {
              if (variant === 'image' && displayMode === 'single') {
                loopSlidePrev()
                if (!pauseAutoRotation) {
                  setPauseAutoRotation(true)
                }
              } else {
                prevSlide()
              }
            }}
            className="hover:border-autumn-storm-60"
          />
          <MediaButton
            title={`Go to next`}
            mode="next"
            aria-controls={carouselItemsId}
            onClick={() => {
              if (variant === 'image' && displayMode === 'single') {
                loopSlideNext()
                if (!pauseAutoRotation) {
                  setPauseAutoRotation(true)
                }
              } else {
                nextSlide()
              }
            }}
            className="hover:border-autumn-storm-60"
          />
        </div>
      </div>
      <ul
        ref={sliderRef}
        id={carouselItemsId}
        className={envisTwMerge(
          `transparent-scrollbar
          transition-all
          duration-300
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
        aria-live={pauseAutoRotation ? 'polite' : 'off'}
      >
        {items?.map((item, i) => {
          const ariaLabel = `${i + 1} of ${items?.length}`
          return variant === 'video' ? (
            <CarouselVideoItem
              key={item.id}
              {...(item as VideoPlayerCarouselItem)}
              displayMode={displayMode}
              aria-label={ariaLabel}
              active={i === currentIndex}
            />
          ) : (
            <CarouselImageItem
              key={item.id}
              {...(item as ImageCarouselItem)}
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
                cancelTimeout()
              }}
            />
          )
        })}
      </ul>
      {/*       <div
        aria-live={variant === 'video' ? 'off' : 'polite'}
        hidden={variant === 'video'}
        aria-atomic="true"
        className="sr-only"
      >
        <span className="sr-only">{`${currentIndex + 1} of ${items?.length}`}</span>
      </div> */}
    </section>
  )
})
