import envisTwMerge from '../../twMerge'
import { forwardRef, HTMLAttributes } from 'react'
import { EventCard } from '@sections/cards/EventCard'
import { EventCardData } from '../../types/index'

type CarouselEventItemProps = {
  event: EventCardData
  className?: string
  active?: boolean
  hasSectionTitle?: boolean
  innerRef?: () => void
} & Omit<HTMLAttributes<HTMLLIElement>, 'title'>

export const CarouselEventItem = forwardRef<HTMLLIElement, CarouselEventItemProps>(function CarouselEventItem(
  { event, hasSectionTitle = false, className = '', active = false, ...rest },
  ref,
) {
  return (
    <li
      {...rest}
      ref={ref}
      aria-current={active}
      className={envisTwMerge(
        `transform-all
        shrink-0
        grow
        relative
        snap-center
        scroll-ml-6
        `,
        className,
      )}
    >
      <EventCard data={event} hasSectionTitle={hasSectionTitle} variant="carousel" />
    </li>
  )
})
