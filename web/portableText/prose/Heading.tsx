'use client'
import { forwardRef } from 'react'
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
    h2: 'mt-2 mb-8 text-xl prose-article:mb-2 prose-article:text-lg prose-article:px-layout-lg',
    h3: 'mt-2 text-md prose-article:px-layout-lg',
  }

  return (
    <Typography
      {...rest}
      ref={ref}
      as={as}
      group="heading"
      variant="unstyled"
      className={`dark:text-white-100 ${headingVariants[as as string]} `}
    >
      {children}
    </Typography>
  )
})

export default Heading
