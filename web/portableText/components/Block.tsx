'use client'
import { Typography, TypographyProps } from '@/core/Typography'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import isEmpty from '../helpers/isEmpty'

export type BlockProps = {
  children: PortableTextBlock[]
  className?: string
} & TypographyProps

export const Block = forwardRef<HTMLParagraphElement, BlockProps>(function Block(
  { children, group, variant = 'body', className = '', ...rest },
  ref,
) {
  //Check for empty blocks
  if (isEmpty(children)) return null

  const paragraphClassNames = `
  my-5
  first:mt-0 
  last:mb-0 
  [:where(h2+*,h3+*)]:mt-0`

  return (
    <Typography
      {...rest}
      ref={ref}
      group={group}
      variant={variant}
      className={twMerge(group === 'paragraph' && paragraphClassNames, className)}
    >
      {children}
    </Typography>
  )
})
