import { IconType } from '@equinor/eds-core-react/dist/types/components/Icon/Icon.types'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const commonButtonStyling = `
w-max
text-sm
px-5
py-3
rounded-md
focus:outline-none
focus-visible:envis-outline
active:scale-105
active:rounded-lg
dark:focus:outline-none
dark:focus-visible:envis-outline-invert
`

export type Variants = 'contained' | 'outlined' | 'ghost'
/** Use for common button styling in Button,IconButton, Link/ButtonLink */
export const getVariant = (variant: Variants): string => {
  switch (variant) {
    case 'ghost':
      return ``
    case 'outlined':
      return `
      border
      border-slate-blue-95
      text-slate-80
      hover:bg-navy-90
      hover:text-white-100
      focus-visible:outline-slate-blue-95
      `
    case 'contained':
    default:
      return `bg-teal-100 
      text-white-100 
      hover:bg-teal-90
      focus-visible:outline-teal-100
      dark:bg-white-100
      dark:hover:bg-white-100/80
      dark:text-slate-80
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
  /** Should make our own Icon component ? */
  icon?: IconType
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'contained', type = 'button', children, icon: Icon, className = '', ...rest }, ref) => {
    const variantClassNames = getVariant(variant)

    const buttonClassNames = twMerge(commonButtonStyling, variantClassNames, `${Icon ? 'flex gap-2' : ''}`, className)

    return (
      <button ref={ref} type={type} className={buttonClassNames} {...rest}>
        {Icon && <Icon />}
        {children}
      </button>
    )
  },
)
