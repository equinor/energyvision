import { ButtonHTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../twMerge'
import { IconData } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'

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
        className={envisTwMerge(
          `flex 
          gap-1
          text-xs
          underline
          hover:no-underline
          focus:outline-none
          focus-visible:envis-outline
          active:scale-99`,
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
