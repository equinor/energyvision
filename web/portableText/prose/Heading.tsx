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
  { children, as, className = '', ...rest },
  ref,
) {
  return (
    <Typography
      {...rest}
      ref={ref}
      as={as}
      group="heading"
      variant="unstyled"
      className={`[:where(h2)]:text-xl prose-article:[:where(h2)]:text-lg [:where(h2+*,h3+*,h4+*)]:mt-0 prose-article:[:where(h2,h3)]:px-layout-lg [:where(h3)]:text-lg prose-article:[:where(h3)]:text-md`}
    >
      {children}
    </Typography>
  )
})

export default Heading
