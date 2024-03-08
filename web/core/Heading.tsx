import { forwardRef, HTMLAttributes } from 'react'
import { OverridableComponent } from '@equinor/eds-utils'
import { twMerge } from 'tailwind-merge'

export type HeadingProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  level?: '1' | '2' | '3' | '4' | '5' | '6'
} & HTMLAttributes<HTMLHeadingElement>

const variants = {
  xs: 'text-xs leading-earthy font-normal',
  sm: 'text-base leading-inherit font-normal',
  md: 'text-md leading-inherit font-normal',
  lg: 'text-lg leading-inherit font-normal',
  xl: 'text-xl leading-inherit font-normal',
  '2xl': 'text-2xl leading-cloudy font-normal',
  '3xl': 'text-3xl leading-earthy font-normal',
  '4xl': 'text-4xl leading-earthy font-normal',
  '5xl': 'text-5xl leading-earthy font-normal',
}

export const Heading: OverridableComponent<HeadingProps, HTMLHeadingElement> = forwardRef(function Heading(
  { size = 'xl', level = '2', className = '', as, children, ...rest },
  ref,
) {
  const HeadingTag = as ?? (`h${level}` as React.ElementType)

  return (
    <HeadingTag {...rest} ref={ref} className={twMerge(`${variants[size]}`, className)}>
      {children}
    </HeadingTag>
  )
})
