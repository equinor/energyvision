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

  let rowsTemplate = 'grid-rows-1'
  if (thumbnail && !content) {
    rowsTemplate = 'grid-rows-[3.5rem_auto_auto]'
  }
  if (!thumbnail && content) {
    rowsTemplate = 'grid-rows-[20%_auto]'
  }
  if (thumbnail && content && title) {
    rowsTemplate = 'grid-rows-[3.5rem_auto_auto]'
  }
  return (
    <li
      ref={ref}
      className={twMerge(
        `grid grid-flow-row auto-rows-max ${content ? 'pt-7 pb-10' : 'py-14'} rounded-card px-10`,
        className,
      )}
      {...rest}
    >
      {thumbnail && (
        <Image image={thumbnail} aspectRatio="1:1" sizes={getSmallerThanPxLgSizes()} className={`h-[3.5rem] w-12`} />
      )}
      <Typography variant="h4" as={content ? 'h3' : 'p'} className={`h-full pb-0 align-bottom`}>
        {title}
      </Typography>
      {content && (
        <Paragraph
          value={content}
          className="prose-ul:list-outside pt-4 prose-li:pl-1 prose-ul:pl-4"
          componentsClassName="p-0"
        />
      )}
    </li>
  )
})
export default CardItem
