import { IconType } from '@equinor/eds-core-react/dist/types/components/Icon/Icon.types'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../twMerge'

export const commonButtonStyling = `
w-fit
text-sm
px-4
py-3
rounded-md
focus:outline-hidden
focus-visible:envis-outline
dark:focus:outline-hidden
dark:focus-visible:envis-outline-invert
active:scale-99
flex
items-center
gap-3
`

export type Variants = 'contained' | 'outlined' | 'ghost' | 'contained-secondary' | 'outlined-secondary'

/** Use for common button styling in Button,IconButton, Link/ButtonLink */
export const getVariant = (variant: Variants): string => {
  /* let sizeClasses = {
    md: "px-4 py-2 rounded-md text-base",
    lg: "px-5 py-3 rounded-lg text-lg",
  }[size];*/

  switch (variant) {
    case 'ghost':
      return `
      hover:bg-moss-green-60
      focus:outline-hidden
      focus-visible:envis-outline
      active:scale-99
      dark:text-white-100
      dark:hover:bg-white-transparent
      dark:focus-visible:envis-outline-invert
      `
    case 'outlined':
      return `
      border
      border-grey-60
      hover:bg-autumn-storm-60
      hover:border-autumn-storm-60
      hover:text-white-100
      focus:outline-hidden
      focus-visible:outline-slate-blue-95
      dark:text-white-100
      dark:border-white-100
      dark:hover:bg-white-transparent
      dark:hover:text-slate-80
      dark:focus-visible:outline-white-100
      `
    case 'outlined-secondary':
      return `
      px-3
      py-2
      lg:px-5
      lg:py-3
      border
      border-grey-60
      text-black-80 
      hover:bg-autumn-storm-60
      hover:border-autumn-storm-60
      hover:text-white-100
      focus:outline-hidden
      focus-visible:outline-slate-blue-95
      dark:text-white-100
      dark:border-white-100
      dark:hover:bg-white-transparent
      dark:focus-visible:outline-white-100
      `
    case 'contained-secondary':
      return `
      px-3
      py-2
      lg:px-5
      lg:py-3
      bg-slate-blue-95
      text-white-100 
      hover:bg-slate-blue-100
      hover:text-white-100
      focus:outline-hidden
      focus-visible:outline-slate-blue-95
    `
    case 'contained':
    default:
      return `bg-norwegian-woods-100 
      text-white-100 
      hover:bg-moss-green-100
      focus:outline-hidden
      focus-visible:outline-norwegian-woods-100
      dark:bg-white-100
      dark:hover:bg-norwegian-woods-40
      dark:text-slate-80
      dark:focus-visible:outline-white-100
      `
  }
}

export type ButtonProps = {
  /** Specifies which variant to use */
  variant?: Variants
  /** Type of button
   * @default 'button'
   */
  type?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'contained', type = 'button', children, className = '', ...rest }, ref) => {
    const variantClassNames = getVariant(variant)

    const buttonClassNames = envisTwMerge(commonButtonStyling, variantClassNames, className)

    return (
      <button ref={ref} type={type} className={buttonClassNames} {...rest}>
        {children}
      </button>
    )
  },
)
