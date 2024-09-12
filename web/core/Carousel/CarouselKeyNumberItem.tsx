import envisTwMerge from '../../twMerge'
import { DisplayModes } from './Carousel'
import { forwardRef, HTMLAttributes } from 'react'
import { KeyNumberItemData } from '../../types/types'
import KeyNumberItem from '@sections/KeyNumber/KeyNumberItem'

type CarouselEventItemProps = {
  keyNumber: KeyNumberItemData
  displayMode?: DisplayModes
  className?: string
  active?: boolean
  hasSectionTitle?: boolean
  innerRef?: () => void
} & Omit<HTMLAttributes<HTMLLIElement>, 'title'>

export const CarouselKeyNumberItem = forwardRef<HTMLLIElement, CarouselEventItemProps>(function CarouselEventItem(
  { keyNumber, displayMode = 'scroll', className = '', active = false, ...rest },
  ref,
) {
  return (
    <li
      {...rest}
      ref={ref}
      key={keyNumber.id}
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
      <KeyNumberItem
        id={keyNumber.id}
        type={keyNumber.type}
        keyNumber={keyNumber.keyNumber}
        description={keyNumber.description}
        unit={keyNumber.unit}
        isScrollable
      />
    </li>
  )
})
