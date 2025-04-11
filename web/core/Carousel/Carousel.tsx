/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  VideoPlayerCarouselItem,
  ImageCarouselItem,
  EventCardData,
  KeyNumberItemData,
  IFrameCarouselItemData,
  VideoPlayerRatios,
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
import { CarouselImageItem } from './CarouselImageItem'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'
import { PortableTextBlock } from '@portabletext/types'
import { toPlainText } from '@portabletext/react'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { FormattedMessage, useIntl } from 'react-intl'
import { CarouselAspectRatios, CarouselItem } from './CarouselItem'
import IFrame from '../../pageComponents/shared/iframe/IFrame'
import { EventCard } from '@sections/cards/EventCard'
import { VideoJsComponent } from '../../pageComponents/shared/VideoPlayer'
import KeyNumberItem from '@sections/KeyNumber/KeyNumberItem'

export type DisplayModes = 'single' | 'scroll'
export type Layouts = 'full' | 'default'

export const getUtilityForAspectRatio = (aspectRatio: string) => {
  switch (aspectRatio) {
    case '16:9':
      return 'aspect-video'
    case '4:3':
      return 'aspect-4/3'
    case '9:16':
      return 'aspect-9/16'
    case '1:1':
      return 'aspect-square'

    default:
      return 'aspect-video'
  }
}

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
  /* If carousel has a title/sectionTitle over it */
  labelledbyId?: string
  className?: string
  listClassName?: string
  autoRotation?: boolean
  hasSectionTitle?: boolean
  title?: PortableTextBlock[]
  /** Variant Image: The section title to be used in translated autorotation control button */
  sectionTitle?: PortableTextBlock[]
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>

const TRANSLATE_X_AMOUNT_LG = 1000
const TRANSLATE_X_AMOUNT_SM = 295
const TRANSLATE_X_AMOUNT_MD = 712

export const Carousel = forwardRef<HTMLElement, CarouselProps>(function Carousel(
  {
    items,
    variant = 'image',
    displayMode = 'scroll',
    autoRotation = false,
    labelledbyId,
    title,
    className = '',
    listClassName = '',
    hasSectionTitle = false,
    sectionTitle,
  },
  ref,
) {
  const CarouselTag = hasSectionTitle ? (`div` as ElementType) : (`section` as ElementType)
  const carouselItemsId = useId()
  const controlsId = useId()
  const intl = useIntl()
  const sliderRef = useRef<HTMLUListElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  //a prefers-reduced-motion user setting must always override autoplay
  const prefersReducedMotion = usePrefersReducedMotion()
  const internalAutoRotation = useMemo(() => {
    //Only image single mode should have auto rotation
    if (prefersReducedMotion) {
      return false
    } else if (autoRotation && variant === 'image' && displayMode === 'single') {
      return true
    } else {
      return false
    }
  }, [autoRotation, displayMode, prefersReducedMotion, variant])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentXPosition, setCurrentXPosition] = useState(0)
  const [currentListTranslateX, setCurrentListTranslateX] = useState(0)
  const [pauseAutoRotation, setPauseAutoRotation] = useState(false)
  const [wasUserInteraction, setWasUserInteraction] = useState(false)
  const isMedium = useMediaQuery(`(min-width: 768px)`)
  const isLarge = useMediaQuery(`(min-width: 1024px)`)
  let TRANSLATE_X_AMOUNT = TRANSLATE_X_AMOUNT_SM
  if (isMedium) {
    TRANSLATE_X_AMOUNT = TRANSLATE_X_AMOUNT_MD
  }
  if (isLarge) {
    TRANSLATE_X_AMOUNT = TRANSLATE_X_AMOUNT_LG
  }
  const [scrollPosition, setScrollPosition] = useState<'start' | 'middle' | 'end'>('start')
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
  const carouselGridTop = `col-start-1 col-end-1 row-start-1 row-end-1`
  const carouselGridBottom = `col-start-1 col-end-1 row-start-2 row-end-2`

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
      const isAtEnd = calculatedYPos >= maxW - itemWidth / 2 + 5 //+ 5 for outlines and some overflow
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
        if (newIndex === 0 && i === items?.length - 1) {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      setWasUserInteraction(true)
      loopSlideNext()
    }
    if (event.key === 'ArrowLeft') {
      setWasUserInteraction(true)
      loopSlidePrev()
    }
  }

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

  const getTranslatedItemCountLabel = (item: number) => {
    return intl.formatMessage(
      {
        id: 'carouselItemCountLabel',
        defaultMessage: 'Item {x} of {carouselLength}',
      },
      {
        x: item,
        carouselLength: items.length,
      },
    )
  }
  const cancelTimeout = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }

  const getCarouselItemVariant = () => {
    if (displayMode === 'single') {
      if (variant === 'iframe') {
        return 'richTextBelow'
      }
      //@ts-ignore: TODO type cast item
      if (variant === 'video' && items.some((item) => item.title)) {
        return 'richTextBelow'
      }
      //@ts-ignore: TODO type cast item
      if (variant === 'image' && items.some((item) => item.type === 'imageWithRichTextBelow')) {
        return 'richTextBelow'
      }
    } else {
      return 'default'
    }
  }

  const getIframeVariantBody = (itemData: IFrameCarouselItemData, index: number) => {
    const { title, description, action, ...iframeData } = itemData
    const element = (
      <IFrame
        frameTitle={iframeData?.frameTitle}
        url={iframeData?.url}
        cookiePolicy={iframeData?.cookiePolicy}
        aspectRatio={'16:9'}
        height={iframeData?.height}
        hasSectionTitle={!!title}
      />
    )

    return (
      <CarouselItem
        key={iframeData._key}
        aria-label={getTranslatedItemCountLabel(index + 1)}
        displayMode={displayMode}
        active={index === currentIndex}
        //@ts-ignore:TODO- didnt work with type assertion as PortableTextBlock[]
        title={title}
        //@ts-ignore:TODO- didnt work with type assertion as PortableTextBlock[]
        content={description}
        action={action}
        overrideHeights={true}
        aspectRatio={iframeData?.aspectRatio as CarouselAspectRatios}
        {...(displayMode === 'single' && {
          style: {
            transform: `translate3d(${itemsXPositions[index]}px, 0px, 0px)`,
          },
          wasUserPress: wasUserInteraction,
        })}
      >
        {element}
      </CarouselItem>
    )
  }
  const getVideoVariantBody = (itemData: VideoPlayerCarouselItem, index: number) => {
    const { title, video, id } = itemData
    const element = (
      <VideoJsComponent
        video={video}
        designOptions={{
          aspectRatio: displayMode === 'single' ? VideoPlayerRatios['16:9'] : VideoPlayerRatios['9:16'],
        }}
        useFillMode={true}
        videoControls={{
          playButton: true,
          controls: true,
        }}
        className={`
        ${displayMode === 'single' ? '' : 'aspect-9/16'}
          object-cover
          `}
      />
    )

    return (
      <CarouselItem
        key={id}
        aria-label={getTranslatedItemCountLabel(index + 1)}
        displayMode={displayMode}
        active={index === currentIndex}
        variant={title ? 'richTextBelow' : 'default'}
        //@ts-ignore:TODO- didnt work with type assertion as PortableTextBlock[]
        title={title}
        className={`${displayMode === 'scroll' ? 'h-full w-[260px] md:w-[372px] lg:w-[405px]' : ''}`}
        {...(displayMode === 'single' && {
          style: {
            transform: `translate3d(${itemsXPositions[index]}px, 0px, 0px)`,
          },
          wasUserPress: wasUserInteraction,
        })}
      >
        {element}
      </CarouselItem>
    )
  }
  const getEventVariantBody = (itemData: EventCardData, index: number) => {
    const element = <EventCard hasSectionTitle={hasSectionTitle} data={itemData} variant="carousel" />

    return (
      <CarouselItem
        key={itemData.id}
        displayMode={displayMode}
        variant="default"
        aria-label={getTranslatedItemCountLabel(index + 1)}
        className={`
          ${displayMode === 'scroll' ? `w-event-carousel-card-w` : ''}
        `}
        {...(displayMode === 'single' && {
          style: {
            transform: `translate3d(${itemsXPositions[index]}px, 0px, 0px)`,
          },
          wasUserPress: wasUserInteraction,
        })}
      >
        {element}
      </CarouselItem>
    )
  }
  const getKeyNumberVariantBody = (itemData: KeyNumberItemData, index: number) => {
    const element = <KeyNumberItem {...itemData} isScrollable />

    return (
      <CarouselItem
        aria-label={getTranslatedItemCountLabel(index + 1)}
        key={itemData.id}
        displayMode="scroll"
        variant="default"
        className={`w-[37vw]`}
      >
        {element}
      </CarouselItem>
    )
  }
  const getCarouselItem = (item: CarouselItemTypes, i: number) => {
    switch (variant) {
      case 'video':
        return getVideoVariantBody(item as VideoPlayerCarouselItem, i)
      case 'image':
        return (
          <CarouselImageItem
            //@ts-ignore:TOdo
            key={item?.id ?? item?._key ?? `image_carousel_${sliderRef.current}_item_${i}`}
            {...(item as ImageCarouselItem)}
            displayMode={displayMode}
            aria-label={getTranslatedItemCountLabel(i + 1)}
            active={i === currentIndex}
            {...(displayMode === 'single' && {
              style: {
                transform: `translate3d(${itemsXPositions[i]}px, 0px, 0px)`,
              },
              wasUserPress: wasUserInteraction,
              onFocus: () => {
                cancelTimeout()
              },
            })}
          />
        )
      case 'event':
        return getEventVariantBody(item as EventCardData, i)
      case 'keyNumber':
        return getKeyNumberVariantBody(item as KeyNumberItemData, i)
      case 'iframe':
        return getIframeVariantBody(item as IFrameCarouselItemData, i)
    }
  }

  const customListVariantClassName = {
    video: '',
    image: '',
    event: 'p-[2px]',
    keyNumber: '',
    iframe: '',
  }

  //  no-scrollbar
  const commonScrollListContainerClassName = `
    no-scrollbar
    flex 
    gap-3 
    lg:gap-6 
    h-full 
    overflow-x-auto
    snap-x
    pb-6`

  const commonSingleListContainerClassName = `
    grid 
    transition-transform 
    ease-scroll 
    delay-0 
    duration-[800ms]
    ${getCarouselItemVariant() === 'richTextBelow' ? carouselGridBottom : carouselGridTop}
    `
  let translatedPlayPauseAutoRotationTitle = ''
  if (internalAutoRotation && labelledbyId && sectionTitle) {
    translatedPlayPauseAutoRotationTitle = toPlainText(sectionTitle)
  }
  if (internalAutoRotation && !labelledbyId && title) {
    translatedPlayPauseAutoRotationTitle = toPlainText(title)
  }

  return (
    <CarouselTag
      ref={ref}
      className={envisTwMerge(
        `${
          displayMode === 'single'
            ? 'relative overflow-hidden flex flex-col'
            : 'px-4 md:p-0 w-full mx-auto lg:px-layout-sm max-w-viewport'
        }`,
        className,
      )}
    >
      <div
        role="group"
        {...(typeof labelledbyId !== undefined && {
          'aria-labelledby': labelledbyId,
        })}
        {...(!labelledbyId &&
          title && {
            'aria-label': toPlainText(title),
          })}
        className={envisTwMerge(
          `${displayMode === 'single' ? `relative mx-auto grid grid-flow-row` : 'flex flex-col-reverse'}`,
          className,
        )}
      >
        {/* Controls - should be before slide in DOM but not visually
         */}
        <div
          aria-labelledby={controlsId}
          className={`
          pt-6 
          pb-2 
          flex 
          ${internalAutoRotation ? 'justify-between' : 'justify-end'}
          ${
            displayMode === 'single'
              ? `mx-auto
              w-single-carousel-card-w-sm
              md:w-single-carousel-card-w-md
              lg:w-single-carousel-card-w-lg
              `
              : ''
          }
          ${getCarouselItemVariant() === 'richTextBelow' ? carouselGridTop : carouselGridBottom}
          `}
        >
          <div id={controlsId} className="sr-only">
            <FormattedMessage id="carousel_controls" defaultMessage="Carousel controls" />
          </div>
          {/** Only image should have autoplay */}
          {internalAutoRotation && variant === 'image' && displayMode === 'single' && (
            <MediaButton
              key={`play_pause_button_${currentIndex}`}
              title={
                pauseAutoRotation
                  ? intl.formatMessage(
                      {
                        id: 'carouselPlay',
                        defaultMessage: 'Play {title} gallery',
                      },
                      {
                        title: translatedPlayPauseAutoRotationTitle,
                      },
                    )
                  : intl.formatMessage(
                      {
                        id: 'carouselPause',
                        defaultMessage: 'Pause {title} gallery',
                      },
                      {
                        title: translatedPlayPauseAutoRotationTitle,
                      },
                    )
              }
              mode={pauseAutoRotation ? 'play' : 'pause'}
              onClick={() => {
                setPauseAutoRotation(!pauseAutoRotation)
              }}
              paused={pauseAutoRotation}
              useTimer
              className="[grid-area:left]"
            />
          )}
          {/** From W3.org:
           * Allow the user to maintain control of the keyboard focus.
           * When the carousel advances automatically, users should not be
           * drawn away from their current place in the page. Also, do not
           * move keyboard focus when the previous or next buttons are
           * used; moving the focus makes it harder for users to browse
           * back and forth between the slides.
           */}
          <div className="flex gap-3 items-center">
            <MediaButton
              title={intl.formatMessage({
                id: 'previous',
                defaultMessage: 'Previous',
              })}
              aria-controls={carouselItemsId}
              mode="previous"
              disabled={(displayMode === 'scroll' && scrollPosition === 'start') ?? false}
              onClick={() => {
                if (displayMode === 'single') {
                  loopSlidePrev()
                  if (variant === 'image' && !pauseAutoRotation) {
                    setPauseAutoRotation(true)
                  }
                } else {
                  prevSlide()
                }
              }}
              className="hover:border-autumn-storm-60"
            />
            <MediaButton
              title={intl.formatMessage({
                id: 'next',
                defaultMessage: 'Next',
              })}
              mode="next"
              aria-controls={carouselItemsId}
              disabled={(displayMode === 'scroll' && scrollPosition === 'end') ?? false}
              onClick={() => {
                if (displayMode === 'single') {
                  loopSlideNext()
                  if (variant === 'image' && !pauseAutoRotation) {
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
          w-full
          focus:outline-dashed
          focus:outline-grey-60
          focus:outline-1
          ${displayMode === 'single' ? commonSingleListContainerClassName : commonScrollListContainerClassName}
          ${customListVariantClassName[variant]}
        `,
            listClassName,
          )}
          {...(displayMode === 'single' && {
            style: {
              transform: `translate3d(${currentListTranslateX}px, 0px, 0px)`,
            },
            onKeyDown: handleKeyDown,
          })}
        >
          {items?.map((item, i) => {
            return getCarouselItem(item, i)
          })}
        </ul>
        {displayMode === 'single' && (
          <div aria-live={pauseAutoRotation ? 'polite' : 'off'} aria-atomic={true} className="sr-only">
            <FormattedMessage
              id="carouselLiveAnnoucement"
              defaultMessage="Showing item {x} of {carouselLength}"
              values={{
                x: currentIndex + 1,
                carouselLength: items.length,
              }}
            />
          </div>
        )}
      </div>
    </CarouselTag>
  )
})
