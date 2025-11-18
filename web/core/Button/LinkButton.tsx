import { ButtonHTMLAttributes, forwardRef } from 'react'
import { IconData } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { twMerge } from 'tailwind-merge'

export type LinkButtonProps = {
  iconData?: IconData
  iconClassName?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ children, iconData, className = '', iconClassName = '', ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(
          `focus-visible:envis-outline flex gap-1 text-xs underline hover:no-underline focus:outline-hidden active:scale-99`,
          className,
        )}
        {...rest}
      >
        {iconData && <TransformableIcon iconData={iconData} className={iconClassName} />}
        {children}
      </button>
    )
  },
)
