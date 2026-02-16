'use client'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { useTranslations } from 'next-intl'
import {
  type ElementType,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { IFrame } from '@/core/IFrame/IFrame'
import { MediaButton } from '@/core/MediaButton/MediaButton'
import { EventCard } from '@/sections/cards/EventCard'
import type { EventCardData } from '@/sections/cards/EventCard/EventCard'
import KeyNumberItem from '@/sections/KeyNumber/KeyNumberItem'
import type { VideoPlayerCarouselItem } from '@/sections/VideoPlayerCarousel/VideoPlayerCarousel'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../lib/hooks/usePrefersReducedMotion'
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type {
  IFrameCarouselItemData,
  KeyNumberItemData,
} from '../../types/index'
import {
  VideoPlayer,
  type VideoPlayerProps,
} from '../VideoJsPlayer/VideoPlayer'
import { CarouselImageItem, type ImageCarouselItem } from './CarouselImageItem'
import { CarouselItem } from './CarouselItem'

export type DisplayModes = 'single' | 'scroll'
export type Layouts = 'full' | 'default'

/** Clean up types here */
type CarouselItemTypes = {
  id?: string
  _key?: string
  _type?: string
  type?: string
} & (
  | VideoPlayerCarouselItem
  | ImageCarouselItem
  | EventCardData
  | KeyNumberItemData
  | IFrameCarouselItemData
)

type Variants = 'video' | 'image' | 'event' | 'keyNumber' | 'iframe'

type CarouselProps = {
  items: CarouselItemTypes[]
  variant?: Variants
  displayMode?: DisplayModes
  /* If carousel has a title/sectionTitle over it */
  labelledbyId?: string
  /* grouped controls and list */
  className?: string
  /* Outer container */
  containerClassName?: string
  listClassName?: string
  autoRotation?: boolean
  hasSectionTitle?: boolean
  title?: PortableTextBlock[]
  /** Variant Image: The section title to be used in translated autorotation control button */
  sectionTitle?: PortableTextBlock[]
  getVariantElementBody?: (itemData: any, index?: number) => JSX.Element
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>

const TRANSLATE_X_AMOUNT_LG = 1000
const TRANSLATE_X_AMOUNT_SM = 370 //old value 295
const TRANSLATE_X_AMOUNT_MD = 712

export const Carousel = forwardRef<HTMLElement, CarouselProps>(
  function Carousel(
    {
      items,
      variant = 'image',
      displayMode = 'scroll',
      autoRotation = false,
      labelledbyId,
      title,
      className = '',
      containerClassName = '',
      listClassName = '',
      hasSectionTitle = false,
      sectionTitle,
      getVariantElementBody,
    },
    ref,
  ) {
    const CarouselTag = hasSectionTitle
      ? (`div` as ElementType)
      : (`section` as ElementType)
    const carouselItemsId = useId()
    const intl = useTranslations()
    const sliderRef = useRef<HTMLUListElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    //a prefers-reduced-motion user setting must always override autoplay
    const prefersReducedMotion = usePrefersReducedMotion()
    const internalAutoRotation = useMemo(() => {
      //Only image single mode should have auto rotation
      if (prefersReducedMotion) {
        return false
      }
      if (autoRotation && variant === 'image' && displayMode === 'single') {
        return true
      }
      return false
    }, [autoRotation, displayMode, prefersReducedMotion, variant])
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
    /* Remove?, didnt work well with scroll container   
const [scrollPosition, setScrollPosition] = useState<'start' | 'middle' | 'end'>('start') */

    const initialPositions = useMemo(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return items?.map((_item, i) => {
        if (i === items.length - 1) {
          return -TRANSLATE_X_AMOUNT
        }
        return TRANSLATE_X_AMOUNT * i
      })
    }, [TRANSLATE_X_AMOUNT, items])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentListTranslateX, setCurrentListTranslateX] = useState(0)
    const [currentXPosition, setCurrentXPosition] = useState(0)
    const [itemsXPositions, setItemsXPositions] = useState<number[]>([])
    const carouselGridTop = `col-start-1 col-end-1 row-start-1 row-end-1`
    const carouselGridBottom = `col-start-1 col-end-1 row-start-2 row-end-2`

    const loopSlideNext = useCallback(() => {
      const isLast = currentIndex === items?.length - 1
      const newIndex = isLast ? 0 : currentIndex + 1
      const newXPosition = currentXPosition + TRANSLATE_X_AMOUNT
      const higestLastItemTranslateXPosition = Math.max(...itemsXPositions)

      //move the ul slider
      const newTranslateX = currentListTranslateX - TRANSLATE_X_AMOUNT
      setCurrentListTranslateX(newTranslateX)

      if (newXPosition === higestLastItemTranslateXPosition) {
        const newPositions = itemsXPositions.map((position, i) => {
          if (newIndex === items?.length - 1 && i === 0) {
            return higestLastItemTranslateXPosition + TRANSLATE_X_AMOUNT
          }
          if (i === newIndex + 1) {
            return higestLastItemTranslateXPosition + TRANSLATE_X_AMOUNT
          }
          return position
        })
        setTimeout(() => setItemsXPositions(newPositions), 400)
      }
      setCurrentIndex(newIndex)
      setCurrentXPosition(newXPosition)
    }, [
      TRANSLATE_X_AMOUNT,
      currentIndex,
      currentListTranslateX,
      currentXPosition,
      items?.length,
      itemsXPositions,
    ])

    const loopSlidePrev = useCallback(() => {
      const isFirst = currentIndex === 0
      const newIndex = isFirst ? items?.length - 1 : currentIndex - 1
      const newXPosition = currentXPosition - TRANSLATE_X_AMOUNT
      const lowestLastItemTranslateXPosition = Math.min(...itemsXPositions)

      //move the ul slider
      const newTranslateX = currentListTranslateX + TRANSLATE_X_AMOUNT
      setCurrentListTranslateX(newTranslateX)

      if (newXPosition === lowestLastItemTranslateXPosition) {
        const newPositions = itemsXPositions.map((position, i) => {
          if (newIndex === 0 && i === items?.length - 1) {
            return lowestLastItemTranslateXPosition - TRANSLATE_X_AMOUNT
          }
          if (i === newIndex - 1) {
            return lowestLastItemTranslateXPosition - TRANSLATE_X_AMOUNT
          }
          return position
        })
        setTimeout(() => setItemsXPositions(newPositions), 400)
      }
      setCurrentIndex(newIndex)
      setCurrentXPosition(newXPosition)
    }, [
      TRANSLATE_X_AMOUNT,
      currentIndex,
      currentListTranslateX,
      currentXPosition,
      items?.length,
      itemsXPositions,
    ])

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
      return intl('carouselItemCountLabel', {
        x: item,
        carouselLength: items.length,
      })
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
        if (variant === 'video' && items.some(item => item.title)) {
          return 'richTextBelow'
        }

        if (
          variant === 'image' &&
          items.some(item => item?.type === 'imageWithRichTextBelow')
        ) {
          return 'richTextBelow'
        }
      } else {
        return 'default'
      }
    }

    const getIframeVariantBody = (
      itemData: IFrameCarouselItemData,
      index: number,
    ) => {
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
    const getVideoVariantBody = (
      itemData: VideoPlayerCarouselItem,
      index: number,
    ) => {
      const { title, video, id } = itemData
      const props: VideoPlayerProps = {
        title: video?.title,
        poster: video?.poster,
        src: video?.src,
        aspectRatio: displayMode === 'scroll' ? '9:16' : '16:9',
        figureCaption: title,
        className: 'min-w-[24rem] h-full',
      }
      //@ts-ignore: TODO
      const element = <VideoPlayer {...props} />

      return (
        <CarouselItem
          key={id}
          aria-label={getTranslatedItemCountLabel(index + 1)}
          displayMode={displayMode}
          active={index === currentIndex}
          /*         className={`${displayMode === 'scroll' ? 'h-full w-[260px] md:w-[372px] lg:w-[405px]' : ''}`} */
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
      const element = getVariantElementBody ? (
        getVariantElementBody(itemData)
      ) : (
        <EventCard
          hasSectionTitle={hasSectionTitle}
          data={itemData}
          variant='carousel'
        />
      )

      return (
        <CarouselItem
          key={itemData.id}
          displayMode={displayMode}
          variant='default'
          aria-label={getTranslatedItemCountLabel(index + 1)}
          className={` ${
            displayMode === 'scroll' ? `w-event-carousel-card-w` : ''
          } `}
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
    const getKeyNumberVariantBody = (
      itemData: KeyNumberItemData,
      index: number,
    ) => {
      const element = <KeyNumberItem as='div' variant='card' {...itemData} />

      return (
        <CarouselItem
          aria-label={getTranslatedItemCountLabel(index + 1)}
          key={itemData.id}
          displayMode='scroll'
          variant='default'
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
              key={
                item?.id ??
                item?._key ??
                `image_carousel_${sliderRef.current}_item_${i}`
              }
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

    const commonScrollListContainerClassName = `
    envis-scrollbar
    grid
    auto-cols-auto
    grid-flow-col 
    gap-3 
    lg:gap-6 
    h-fit 
    overflow-x-auto
    snap-x
    pb-2`

    const commonSingleListContainerClassName = `
    grid 
    transition-transform 
    ease-scroll  
    duration-[800ms]
    ${
      getCarouselItemVariant() === 'richTextBelow'
        ? carouselGridBottom
        : carouselGridTop
    }
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
        className={twMerge(
          `${
            displayMode === 'single'
              ? 'relative flex flex-col overflow-hidden'
              : 'w-full'
          }`,
          containerClassName,
        )}
      >
        <div
          {...(typeof labelledbyId !== 'undefined' && {
            'aria-labelledby': labelledbyId,
          })}
          {...(!labelledbyId &&
            title && {
              'aria-label': toPlainText(title),
            })}
          className={twMerge(
            `${
              displayMode === 'single'
                ? `relative grid grid-flow-row justify-center`
                : ''
            }`,
            className,
          )}
        >
          {/* Controls - should be before slide in DOM but not necessarily visually
           */}
          {displayMode === 'single' && (
            <fieldset
              className={`flex pt-6 pb-2 ${
                internalAutoRotation ? 'justify-between' : 'justify-end'
              } ${`mx-auto w-single-carousel-card-w-sm md:w-single-carousel-card-w-md lg:w-single-carousel-card-w-lg`} ${
                getCarouselItemVariant() === 'richTextBelow'
                  ? carouselGridTop
                  : carouselGridBottom
              }`}
            >
              <legend className='sr-only'>{intl('carousel_controls')}</legend>
              {/** Only image should have autoplay */}
              {internalAutoRotation && variant === 'image' && (
                <MediaButton
                  key={`play_pause_button_${currentIndex}`}
                  title={
                    pauseAutoRotation
                      ? intl('carouselPlay', {
                          title: translatedPlayPauseAutoRotationTitle,
                        })
                      : intl('carouselPause', {
                          title: translatedPlayPauseAutoRotationTitle,
                        })
                  }
                  mode={pauseAutoRotation ? 'play' : 'pause'}
                  onClick={() => {
                    setPauseAutoRotation(!pauseAutoRotation)
                  }}
                  paused={pauseAutoRotation}
                  useTimer
                  className='[grid-area:left]'
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
              <div className='flex items-center gap-3'>
                <MediaButton
                  title={intl('previous')}
                  aria-controls={carouselItemsId}
                  mode='previous'
                  onClick={() => {
                    loopSlidePrev()
                    if (variant === 'image' && !pauseAutoRotation) {
                      setPauseAutoRotation(true)
                    }
                  }}
                />
                <MediaButton
                  title={intl('next')}
                  mode='next'
                  aria-controls={carouselItemsId}
                  onClick={() => {
                    loopSlideNext()
                    if (variant === 'image' && !pauseAutoRotation) {
                      setPauseAutoRotation(true)
                    }
                  }}
                />
              </div>
            </fieldset>
          )}
          <ul
            ref={sliderRef}
            id={carouselItemsId}
            {...(displayMode === 'scroll' && {
              tabIndex: 0,
            })}
            className={twMerge(
              `w-full focus:outline-dashed focus:outline-1 focus:outline-grey-60 ${
                displayMode === 'single'
                  ? commonSingleListContainerClassName
                  : commonScrollListContainerClassName
              } ${customListVariantClassName[variant]} `,
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
            <div
              aria-live={pauseAutoRotation ? 'polite' : 'off'}
              aria-atomic={true}
              className='sr-only'
            >
              {intl('carouselLiveAnnoucement', {
                x: currentIndex + 1,
                carouselLength: items.length,
              })}
            </div>
          )}
        </div>
      </CarouselTag>
    )
  },
)
