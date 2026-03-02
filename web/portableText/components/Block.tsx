'use client'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { Typography, type TypographyProps } from '@/core/Typography'
import isEmpty from '../helpers/isEmpty'

export type BlockProps = {
  children: PortableTextBlock[] | undefined
  className?: string
} & TypographyProps

export const Block = forwardRef<HTMLParagraphElement, BlockProps>(
  function Block({ children, group, variant, className = '' }, ref) {
    //Check for empty blocks
    if (isEmpty(children) || typeof children === 'undefined') return null

    return (
      <Typography
        ref={ref}
        group={group}
        variant={variant}
        className={className}
      >
        {children}
      </Typography>
    )
  },
)
