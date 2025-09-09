'use client'
import { forwardRef } from 'react'
import { Typography, TypographyProps } from '@/core/Typography'

export type HeadingProps = {
  /* Only Heading or Article group from Typography */
  group?: 'heading' | 'article'
  /* Only Heading or Article variants from Typography */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | '3xl' | '4xl' | '5xl' | '8xl'
  children?: React.ReactNode
  className?: string
} & Omit<TypographyProps, 'variant' | 'group'>

/**
 * Prose is regular styling them the other prose-... stacks to the right for higher specificity
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { children, group = 'heading', variant = 'h2', className = '', ...rest },
  ref,
) {
  console.log('Heading group', group)
  console.log('Heading variant', variant)
  /*  Apply these in the blocks serializer and use Typography variants direct 
 ${textVariant === 'small' ? 'text-sm' : ''} 
  ${textVariant === 'large' ? 'text-2xl leading-snug' : ''} 
  ${textVariant === 'extraLarge' ? 'text-4xl leading-planetary font-medium lg:text-5xl 2xl:text-8xl' : ''}
  ${textVariant === 'twoXL' ? 'text-4xl leading-planetary font-medium lg:text-5xl 2xl:text-8xl' : ''} */

  return (
    <Typography {...rest} ref={ref} group={group} variant={variant} className={className}>
      {children}
    </Typography>
  )
})
