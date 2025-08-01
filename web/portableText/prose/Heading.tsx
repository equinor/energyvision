'use client'
import { ElementType, forwardRef } from 'react'
import { Typography, TypographyProps } from '@/core/Typography'

export type HeadingProps = {
  children?: React.ReactNode
  className?: string
} & TypographyProps
/**
 * Prose is regular styling them the other prose-... stacks to the right for higher specificity
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { children, as = 'h2', className = '', ...rest },
  ref,
) {
  const headingVariants: Record<string, string> = {
    h2: 'my-2 text-xl prose-article:text-lg prose-article:px-layout-lg ',
    h3: 'text-lg prose-article:px-layout-lg prose-article:text-md',
  }
  return (
    <Typography
      {...rest}
      ref={ref}
      as={as}
      group="heading"
      variant="unstyled"
      className={`${headingVariants[as as string]} *:first:mt-0`}
    >
      {children}
    </Typography>
  )
})

export default Heading
