import envisTwMerge from '../../twMerge'
import { forwardRef, HTMLAttributes } from 'react'
import { KeyNumberItemData } from '../../types/index'
import KeyNumberItem from '@sections/KeyNumber/KeyNumberItem'

type CarouselEventItemProps = {
  keyNumber: KeyNumberItemData
  className?: string
  active?: boolean
  hasSectionTitle?: boolean
  innerRef?: () => void
} & Omit<HTMLAttributes<HTMLLIElement>, 'title'>

export const CarouselKeyNumberItem = forwardRef<HTMLLIElement, CarouselEventItemProps>(function CarouselEventItem(
  { keyNumber, className = '', active = false, ...rest },
  ref,
) {
  return (
    <li
      {...rest}
      ref={ref}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={active ? 0 : -1}
      key={keyNumber.id}
      aria-current={active}
      aria-roledescription="slide"
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
