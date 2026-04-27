import type { PortableTextBlock } from 'next-sanity'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@/core/Typography'
import { getDisplayTextVariant } from '@/core/Typography/Typography'
import Blocks from '@/portableText/Blocks'

export type CardItemProps = {
  className?: string
  id: string
  title?: string
  content?: PortableTextBlock[]
  dark?: boolean
  //bg-<colorUtility> e.g. bg-blue-50
  background?: string
  displayTextVariant?: 'none' | 'base' | 'lg' | 'xl'
} & HTMLAttributes<HTMLLIElement>

const CardItem = forwardRef<HTMLLIElement, CardItemProps>(function CardItem(
  {
    title,
    content,
    background = 'bg-blue-50',
    dark = true,
    displayTextVariant = 'none',
    className = '',
  },
  ref,
) {
  console.log('CardItem background', background)
  console.log('CardItem dark', dark)

  const titleVariant =
    displayTextVariant !== 'none'
      ? getDisplayTextVariant(displayTextVariant)
      : content
        ? 'h3'
        : 'h2'

  return (
    <li
      ref={ref}
      className={twMerge(
        `${content ? '' : 'flex items-center justify-center'} min-h-50 rounded-md px-6 pt-4 pb-6 text-slate-80 dark:text-white-100 ${background} ${dark ? 'dark' : ''}`,
        className,
      )}
    >
      <Typography
        group={displayTextVariant === 'none' ? 'heading' : 'display'}
        variant={titleVariant}
        as={content ? 'h3' : 'p'}
        className='mb-4 lg:mb-4'
      >
        {title}
      </Typography>
      {content && <Blocks value={content} variant='body' />}
    </li>
  )
})
export default CardItem
