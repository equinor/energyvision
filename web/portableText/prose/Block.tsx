'use client'
import { forwardRef } from 'react'

export type BlockProps = {
  children?: React.ReactNode
  variant?: 'default' | 'prose'
  textVariant?: 'normal' | 'small' | 'large' | 'extraLarge'
  className?: string
}
/** Regular link style for use*/
export const Block = forwardRef<HTMLParagraphElement, BlockProps>(function Block(
  { children, textVariant = 'normal' },
  ref,
) {
  return (
    <p
      className={`my-5 text-base first:mt-0 last:mb-0 dark:text-white-100 prose-medium:text-md prose-article:px-layout-lg [:where(h2+*,h3+*)]:mt-0 ${textVariant === 'small' ? 'text-sm' : ''} ${textVariant === 'large' ? 'text-2xl leading-snug' : ''} ${textVariant === 'extraLarge' ? 'text-4xl leading-planetary font-medium lg:text-5xl 2xl:text-8xl' : ''} `}
      ref={ref}
    >
      {children}
    </p>
  )
})

export default Block
