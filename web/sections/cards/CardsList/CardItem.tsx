import Image, { getSmallerThanPxLgSizes } from '@core/SanityImage/SanityImage'
import { Paragraph, Typography } from '@core/Typography'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import type { CardListItemData } from '../../../types/index'

export type CardItemProps = {
  className?: string
  data: CardListItemData
} & HTMLAttributes<HTMLLIElement>

const CardItem = forwardRef<HTMLLIElement, CardItemProps>(function CardItem({ data, className = '', ...rest }, ref) {
  const { thumbnail, title, content } = data

  return (
    <li
      ref={ref}
      className={twMerge(
        `
      ${content ? 'pt-7 pb-10' : 'py-14'}
      px-10
      rounded-md
      text-slate-80
      dark:text-white-100
      `,
        className,
      )}
      {...rest}
    >
      {thumbnail && (
        <Image image={thumbnail} aspectRatio="1:1" sizes={getSmallerThanPxLgSizes()} className={`w-12 h-auto mb-3`} />
      )}
      <Typography variant="h4" as={content ? 'h3' : 'p'} className={`pb-0`}>
        {title}
      </Typography>
      {content && (
        <Paragraph
          value={content}
          className="mt-4 prose-ul:pl-4 prose-ul:list-outside prose-li:pl-1 "
          componentsClassName="p-0"
        />
      )}
    </li>
  )
})
export default CardItem
