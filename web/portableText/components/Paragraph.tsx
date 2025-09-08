'use client'
import { Typography, TypographyProps } from '@/core/Typography'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import isEmpty from '../helpers/isEmpty'

export type ParagraphProps = {
  children: PortableTextBlock[]
  group?: 'ingress' | 'paragraph'
  /* Only Paragraph and Ingress variants from Typography variants */
  variant?: 'body' | 'caption' | 'overline' | 'eyebrow' | 'small'
  className?: string
} & Omit<TypographyProps, 'variant' | 'group'>
/** For regular content */
export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph(
  { children, group = 'paragraph', variant = 'body', className = '', ...rest },
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
    <Typography {...rest} ref={ref} group={group} variant={variant} className={twMerge(paragraphClassNames, className)}>
      {children}
    </Typography>
  )
})
