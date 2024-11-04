import {
  VideoPlayerCarouselItem,
  ImageCarouselItem,
  EventCardData,
  KeyNumberItemData,
  IFrameCarouselItemData,
} from '../../types/index'
import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import envisTwMerge from '../../twMerge'
import { MediaButton } from '@core/MediaButton/MediaButton'
import { CarouselVideoItem } from './CarouselVideoItem'
import { CarouselImageItem } from './CarouselImageItem'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'
import { PortableTextBlock } from '@portabletext/types'
import { toPlainText } from '@portabletext/react'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { CarouselEventItem } from './CarouselEventItem'
import { CarouselKeyNumberItem } from './CarouselKeyNumberItem'
import { CarouselIframeItem } from './CarouselIframeItem'

export type DisplayModes = 'single' | 'scroll'
export type Layouts = 'full' | 'default'
type CarouselItemTypes =
  | VideoPlayerCarouselItem
  | ImageCarouselItem
  | EventCardData
  | KeyNumberItemData
  | IFrameCarouselItemData
type Variants = 'video' | 'image' | 'event' | 'keyNumber' | 'iframe'

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
  hasSectionTitle?: boolean
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
    autoRotation = false,
    labelledbyId,
    title,
    className = '',
    listClassName = '',
    hasSectionTitle = false,
  },
  ref,
) {
  const CarouselTag = hasSectionTitle ? (`div` as ElementType) : (`section` as ElementType)
  const carouselItemsId = useId()
  const controlsId = useId()
  const sliderRef = useRef<HTMLUListElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  //a prefers-reduced-motion user setting must always override autoplay
  const prefersReducedMotion = usePrefersReducedMotion()
  const internalAutoRotation = prefersReducedMotion ? false : autoRotation && displayMode === 'single'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentXPosition, setCurrentXPosition] = useState(0)
  const [currentListTranslateX, setCurrentListTranslateX] = useState(0)
  const [pauseAutoRotation, setPauseAutoRotation] = useState(false)
  let TRANSLATE_X_AMOUNT = TRANSLATE_X_AMOUNT_SM
  const isMedium = useMediaQuery(`(min-width: 768px)`)
  const isLarge = useMediaQuery(`(min-width: 1024px)`)
  const [scrollPosition, setScrollPosition] = useState<'start' | 'middle' | 'end'>('start')

  if (isMedium) {
    TRANSLATE_X_AMOUNT = TRANSLATE_X_AMOUNT_MD
  }
  if (isLarge) {
    TRANSLATE_X_AMOUNT = TRANSLATE_X_AMOUNT_LG
  }

  const initialPositions = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return items?.map((item, i) => {
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
      const calculatedYPos = Math.abs(sliderRef?.current.scrollLeft - calculatedOffset)
      const isAtStart = calculatedYPos <= 0 + itemWidth / 2
      if (scrollPosition === 'end') {
        setScrollPosition('middle')
      }
      if (isAtStart) {
        setScrollPosition('start')
      }
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
      const calculatedYPos = Math.abs(sliderRef?.current.scrollLeft + calculatedOffset)
      const maxW = sliderRef?.current.scrollWidth - sliderRef?.current.clientWidth
      const isAtEnd = calculatedYPos >= maxW - itemWidth / 2
      if (scrollPosition === 'start') {
        setScrollPosition('middle')
      }
      if (isAtEnd) {
        setScrollPosition('end')
      }
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
    video: 'flex gap-3 lg:gap-12 w-full h-full overflow-y-hidden no-scrollbar',
    image: `${
      displayMode === 'single'
        ? 'grid transition-transform ease-scroll delay-0 duration-[800ms]'
        : 'flex gap-3 md:gap-8 w-full h-full overflow-y-hidden no-scrollbar'
    }`,
    event: `flex gap-3 lg:gap-6 w-full h-full overflow-y-hidden no-scrollbar`,
    keyNumber: `flex w-full gap-3xl`,
    iframe: `flex mx-0 gap-md lg:px-0 px-6 lg:no-scrollbar`,
  }
  const listDisplayModeClassName = {
    scroll: 'snap-mandatory snap-x overflow-x-scroll',
    single: ``,
  }

  const getCarouselItem = (item: CarouselItemTypes, i: number) => {
    const ariaLabel = `${i + 1} of ${items?.length}`
    switch (variant) {
      case 'video':
        return (
          <CarouselVideoItem
            key={item.id}
            {...(item as VideoPlayerCarouselItem)}
            displayMode={displayMode}
            aria-label={ariaLabel}
            active={i === currentIndex}
          />
        )
      case 'image':
        return (
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
                onFocus: () => cancelTimeout(),
              })}
          />
        )
      case 'event':
        return (
          <CarouselEventItem
            key={item.id}
            event={item as EventCardData}
            displayMode={displayMode}
            aria-label={ariaLabel}
            active={i === currentIndex}
            hasSectionTitle={hasSectionTitle}
          />
        )
      case 'keyNumber':
        return (
          <CarouselKeyNumberItem
            key={item.id}
            keyNumber={item as KeyNumberItemData}
            displayMode={displayMode}
            aria-label={ariaLabel}
            active={i === currentIndex}
            hasSectionTitle={hasSectionTitle}
          />
        )
      case 'iframe':
        return (
          <CarouselIframeItem
            className="pt-lg"
            key={item.id}
            noOfSiblings={items.length}
            displayMode={displayMode}
            aria-label={ariaLabel}
            active={i === currentIndex}
            title={(item as IFrameCarouselItemData).title}
            action={(item as IFrameCarouselItemData).action}
            description={(item as IFrameCarouselItemData).description}
            frameTitle={(item as IFrameCarouselItemData).frameTitle}
            url={(item as IFrameCarouselItemData).url}
            cookiePolicy={(item as IFrameCarouselItemData).cookiePolicy}
            aspectRatio={(item as IFrameCarouselItemData).aspectRatio}
          />
        )
    }
  }

  return (
    <CarouselTag
      ref={ref}
      {...(hasSectionTitle && {
        role: 'region',
      })}
      {...(typeof labelledbyId !== undefined && {
        'aria-labelledby': labelledbyId,
      })}
      {...(!labelledbyId &&
        title && {
          'aria-label': toPlainText(title),
        })}
      {...(displayMode === 'scroll' && {
        tabIndex: 0,
      })}
      aria-roledescription="carousel"
      className={envisTwMerge(
        `w-full
        relative
        mx-auto
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
        } pt-6 pb-2 ${items.length === 2 ? 'lg:hidden' : ''} flex ${
          internalAutoRotation ? 'justify-between' : 'justify-end'
        }`}
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
            title={`Go to previous`}
            aria-controls={carouselItemsId}
            mode="previous"
            disabled={displayMode === 'scroll' && scrollPosition === 'start'}
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
            disabled={displayMode === 'scroll' && scrollPosition === 'end'}
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
          `transition-all
          duration-300
          m-auto
          ${variant === 'event' ? 'p-[2px]' : ''}
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
          return getCarouselItem(item, i)
        })}
      </ul>
    </CarouselTag>
  )
})
