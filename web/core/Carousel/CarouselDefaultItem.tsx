import envisTwMerge from '../../twMerge'
import { forwardRef, HTMLAttributes, ReactNode, useId } from 'react'

type CarouselDefaultItemProps = {
  active?: boolean
  children?: ReactNode
} & HTMLAttributes<HTMLLIElement>

/* Default carousel item
  Only use with scroll 
*/
export const CarouselDefaultItem = forwardRef<HTMLLIElement, CarouselDefaultItemProps>(function CarouselDefaultItem(
  props,
  ref,
) {
  const id = useId()
  return (
    <li
      {...props}
      key={id}
      ref={ref}
      aria-current={props.active ?? false}
      className={envisTwMerge(
        `group
        w-[80%]    
        transform-all
        shrink-0
        grow
        relative
        snap-center
        scroll-ml-6
        `,
        props?.className ?? '',
      )}
      data-state={'scroll'}
    >
      {props.children}
    </li>
  )
})
