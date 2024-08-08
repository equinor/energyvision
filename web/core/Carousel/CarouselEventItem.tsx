import envisTwMerge from '../../twMerge'
import { DisplayModes } from './Carousel'
import { forwardRef, HTMLAttributes } from 'react'
import { EventCard } from '@sections/cards/EventCard'
import { EventCardData } from '../../types/types'
//import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

type CarouselEventItemProps = {
  event: EventCardData
  displayMode?: DisplayModes
  className?: string
  active?: boolean
  hasSectionTitle?: boolean
  innerRef?: () => void
} & Omit<HTMLAttributes<HTMLLIElement>, 'title'>

export const CarouselEventItem = forwardRef<HTMLLIElement, CarouselEventItemProps>(function CarouselEventItem(
  { event, displayMode = 'scroll', hasSectionTitle = false, className = '', active = false, ...rest },
  ref,
) {
  return (
    <li
      {...rest}
      ref={ref}
      aria-current={active}
      aria-roledescription="slide"
      className={envisTwMerge(
        `transform-all
        shrink-0
        grow
        relative
        ${displayMode === 'scroll' ? 'snap-center scroll-ml-6' : ''}
        `,
        className,
      )}
    >
      <EventCard data={event} hasSectionTitle={hasSectionTitle} variant="carousel" />
    </li>
  )
})
