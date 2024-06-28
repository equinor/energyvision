import { useId } from '@equinor/eds-utils'
import { ImageWithCaptionData, ImageWithAlt, VideoPlayerCarouselItem, VideoPlayerRatios } from '../../types/types'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import envisTwMerge from '../../twMerge'
import { MediaButton } from '@core/MediaButton/MediaButton'
import { CarouselVideoItem } from './CarouselVideoItem'
import { CarouselImageItem } from './CarouselImageItem'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'

export type DisplayModes = 'single' | 'scroll'
export type Layouts = 'full' | 'default'
type CarouselItemTypes = VideoPlayerCarouselItem | ImageWithCaptionData | ImageWithAlt
type Variants = 'video' | 'image'

type CarouselType = {
  items: CarouselItemTypes[]
  /* To calculate number of items in view */
  aspectRatio: VideoPlayerRatios | number
  variant?: Variants
  displayMode?: DisplayModes
  layout?: Layouts
  /* If carousel has a title over it */
  labelledbyId?: string
  className?: string
  listClassName?: string
  autoRotation?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Carousel = ({
  items,
  variant = 'video',
  displayMode = 'scroll',
  layout = 'full',
  autoRotation = false,
  labelledbyId,
  className = '',
  listClassName = '',
  aspectRatio,
  ...rest
}: CarouselType) => {
  const carouselId = useId('carousel')
  const carouselItemsId = useId('carousel-items')
  const sliderRef = useRef<HTMLUListElement>(null)
  //a prefers-reduced-motion user setting must always override autoplay
  const prefersReducedMotion = usePrefersReducedMotion()
  const internalAutoRotation = prefersReducedMotion ? false : autoRotation
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollAmount = 300
  const swiper = useSwiper()

  const prevSlide = () => {
    console.log('swiper', swiper)
    if (swiper) {
      swiper?.slidePrev()
    }

    /*     const isFirst = currentIndex === 0
    const newIndex = isFirst ? items?.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    if (sliderRef?.current) {
      const slider = sliderRef.current
      const childOffset = slider.childNodes[newIndex]?.offsetLeft
      console.log('childOffset', childOffset)
      sliderRef.current.scrollBy({
        top: 0,
        left: -childOffset,
        behavior: 'smooth',
      })
    } */
  }
  const nextSlide = () => {
    swiper.slideNext()
    /*     const isLast = currentIndex === items?.length - 1
    const newIndex = isLast ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    if (sliderRef?.current) {
      const gap = 48
      const slider = sliderRef.current
      const noOfItems = slider.childElementCount
      const childOffset = slider.childNodes[newIndex]?.offsetLeft
      console.log('childOffset', childOffset)
      sliderRef.current.scrollBy({
        top: 0,
        left: +childOffset,
        behavior: 'smooth',
      })
      const scrollWidth = slider.scrollWidth
    } */
  }
  const scrollEnd = () => {
    if (sliderRef?.current) {
      sliderRef.current.scrollBy({
        top: 0,
        left: +scrollAmount,
        behavior: 'smooth',
      })
    }
  }
  const scrollStart = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        top: 0,
        left: -scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const layoutClassNames = {
    full: ``,
    default: `px-layout-sm mx-auto max-w-viewport`,
  }

  const getVariantComponent = (itemData: CarouselItemTypes, isActive: boolean, ariaLabel: string) => {
    return variant === 'video' ? (
      <CarouselVideoItem
        {...(itemData as VideoPlayerCarouselItem)}
        displayMode={displayMode}
        aria-label={ariaLabel}
        active={isActive}
      />
    ) : (
      <CarouselImageItem
        {...(itemData as ImageWithAlt | ImageWithCaptionData)}
        displayMode={displayMode}
        aria-label={ariaLabel}
        active={isActive}
      />
    )
  }

  const controlButtonClassName = `
  bg-autumn-storm-60
  dark:bg-white-100
  text-slate-80
  hover:bg-autumn-storm-50
 `
  const ariaLive = internalAutoRotation ? 'off' : 'polite'

  //stop autorotation on hover and focus on a slide
  useEffect(() => {
    if (internalAutoRotation) {
      const next = (currentIndex + 1) % items.length
      const id = setTimeout(() => setCurrentIndex(next), 300)
      return () => clearTimeout(id)
    }
  }, [currentIndex, internalAutoRotation, items.length])

  const getSlidesPerView = () => {}

  /*TODO:
  visible focus marker
  horizontal scroll offset on next  and prev
  
*/
  return (
    <section
      id={carouselId}
      aria-labelledby={labelledbyId}
      role="group"
      aria-roledescription="carousel"
      className={envisTwMerge(
        `
        flex 
        flex-col-reverse
        ${layoutClassNames[layout]}
        `,
        className,
      )}
    >
      {/* Controls - should be before slide in DOM but not visually 
                [scrollbar-width:none]
      */}
      <div className={`pt-6 flex ${internalAutoRotation ? 'justify-between' : 'justify-end'}`}>
        {internalAutoRotation && (
          <MediaButton title={`Play/pause`} mode="play" iconClassName={controlButtonClassName} />
        )}
        <div className="flex gap-2 ">
          <MediaButton
            title={`Go to previous`}
            aria-controls={carouselItemsId}
            mode="previous"
            iconClassName={controlButtonClassName}
            onClick={() => prevSlide()}
          />
          <MediaButton
            title={`Go to next`}
            mode="next"
            aria-controls={carouselItemsId}
            iconClassName={controlButtonClassName}
            onClick={() => nextSlide()}
          />
        </div>
      </div>
      {/*       <ul
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
        `,
          listClassName,
        )}
        id={carouselItemsId}
        aria-live={ariaLive}
      > */}
      <Swiper
        spaceBetween={30}
        loop={true}
        mousewheel={true}
        {...(displayMode === 'single' && {
          slidesPerView: 3,
        })}
        {...(layout === 'default' && {
          centeredSlides: true,
        })}
        freeMode={true}
        modules={[Autoplay]}
        {...(autoRotation
          ? {
              autoplay: {
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              },
            }
          : {})}
        className="w-full h-full"
      >
        {items?.map((item, i, array) => {
          const ariaLabel = `${i + 1} of ${items?.length}`
          return (
            <SwiperSlide key={item.id}>{({ isActive }) => getVariantComponent(item, isActive, ariaLabel)}</SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}
