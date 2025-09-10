import type { CardListItemData } from '../../../types/index'
import { Typography } from '@/core/Typography'
import { twMerge } from 'tailwind-merge'
import { HTMLAttributes, forwardRef } from 'react'
import Blocks from '@/portableText/Blocks'

export type CardItemProps = {
  className?: string
  data: CardListItemData
} & HTMLAttributes<HTMLLIElement>

const CardItem = forwardRef<HTMLLIElement, CardItemProps>(function CardItem({ data, className = '', ...rest }, ref) {
  const { title, content } = data

  return (
    <li
      ref={ref}
      className={twMerge(
        ` ${content ? 'pt-7 pb-10' : 'py-14'} rounded-md px-10 text-slate-80 dark:text-white-100`,
        className,
      )}
      {...rest}
    >
      <Typography variant="h4" as={content ? 'h3' : 'p'} className={`pb-0`}>
        {title}
      </Typography>
      {content && <Blocks value={content} />}
    </li>
  )
})
export default CardItem
