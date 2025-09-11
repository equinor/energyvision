'use client'
import { Typography, TypographyProps } from '@/core/Typography'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import isEmpty from '../helpers/isEmpty'
import { TypographyGroups, variants } from '@/core/Typography/variants'

export type BlockProps = {
  children: PortableTextBlock[]
  className?: string
} & TypographyProps

export const Block = forwardRef<HTMLParagraphElement, BlockProps>(function Block(
  { children, group, variant = 'body', className = '', ...rest },
  ref,
) {
  console.log('children', children)
  //Check for empty blocks
  if (isEmpty(children)) return null

  let groupFromVariant = group ? group : 'paragraph'
  if (!group) {
    Object.entries(variants).forEach(([key, value]) => {
      if (Object.keys(value).some((el) => String(el) === String(variant))) {
        groupFromVariant = key as TypographyGroups
      }
    })
  }

  return (
    <Typography {...rest} ref={ref} group={groupFromVariant} variant={variant} className={twMerge(``, className)}>
      {children}
    </Typography>
  )
})
