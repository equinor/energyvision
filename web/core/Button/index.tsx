import { IconType } from '@equinor/eds-core-react/dist/types/components/Icon/Icon.types'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../twMerge'

export const commonButtonStyling = `
w-fit
text-sm
px-3
py-2
lg:px-5
lg:py-3
rounded-md
focus:outline-none
focus-visible:envis-outline
dark:focus:outline-none
dark:focus-visible:envis-outline-invert
active:scale-99
flex
items-center
gap-3
`

export type Variants = 'contained' | 'outlined' | 'ghost' | 'contained-secondary' | 'outlined-secondary'

/** Use for common button styling in Button,IconButton, Link/ButtonLink */
export const getVariant = (variant: Variants): string => {
  switch (variant) {
    case 'ghost':
      return `
      hover:bg-moss-green-60
      focus:outline-none
      focus-visible:envis-outline
      active:scale-99
      dark:text-white-100
      dark:hover:bg-white-transparent
      dark:focus-visible:envis-outline-invert
      `
    case 'outlined':
      return `
      border
      border-north-sea-100
      text-norwegian-woods-100
      hover:bg-moss-green-60
      hover:text-moss-green-100
      focus:outline-none
      focus-visible:outline-slate-blue-95
      dark:text-white-100
      dark:border-white-100
      dark:hover:bg-white-transparent
      dark:focus-visible:outline-white-100
      `
    case 'outlined-secondary':
      return `
      border
      border-north-sea-100
      text-black-80 
      hover:bg-slate-blue-100
      hover:text-white-100
      focus:outline-none
      focus-visible:outline-slate-blue-95
      dark:text-white-100
      dark:border-white-100
      dark:hover:bg-white-transparent
      dark:focus-visible:outline-white-100
      `
    case 'contained-secondary':
      return `bg-slate-blue-95 
      text-white-100 
      hover:bg-slate-blue-100
      hover:text-white-100
      focus:outline-none
      focus-visible:outline-slate-blue-95
    `
    case 'contained':
    default:
      return `bg-norwegian-woods-100 
      text-white-100 
      hover:bg-moss-green-100
      focus:outline-none
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
  /** Should make our own Icon component ? */
  icon?: IconType
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'contained', type = 'button', children, icon: Icon, className = '', ...rest }, ref) => {
    const variantClassNames = getVariant(variant)

    const buttonClassNames = envisTwMerge(
      commonButtonStyling,
      variantClassNames,
      `${Icon ? 'flex gap-2' : ''}`,
      className,
    )

    return (
      <button ref={ref} type={type} className={buttonClassNames} {...rest}>
        {Icon && <Icon />}
        {children}
      </button>
    )
  },
)
