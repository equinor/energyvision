import envisTwMerge from '../../twMerge'
import { forwardRef, HTMLAttributes, ReactNode, useId } from 'react'

export type Variants = 'richTextBelow' | 'captionOnItem' | 'default'

type CarouselItemProps = {
  variant?: Variants
  active?: boolean
  children?: ReactNode
} & HTMLAttributes<HTMLLIElement>
/* Default carousel item
  Only use with scroll 
*/
export const CarouselItem = forwardRef<HTMLLIElement, CarouselItemProps>(function CarouselItem(
  { variant = 'richTextBelow', active, children, className = '', ...rest },
  ref,
) {
  const id = useId()
  return (
    <li
      {...rest}
      key={id}
      ref={ref}
      aria-current={active ?? false}
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
        className ?? '',
      )}
    >
      {children}
    </li>
  )
})
