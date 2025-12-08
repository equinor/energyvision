'use client'
import type { IconData } from '@equinor/eds-icons'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { twMerge } from '@/lib/twMerge/twMerge'
import { TransformableIcon } from '../../icons/TransformableIcon'

export type LinkButtonVariant = 'default' | 'toTop'
export type LinkButtonProps = {
  variant?: LinkButtonVariant
  iconData?: IconData
  iconClassName?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  (
    {
      variant = 'default',
      children,
      iconData,
      className = '',
      iconClassName = '',
      onClick,
      ...rest
    },
    ref,
  ) => {
    const handleScrollToTop = () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    const classNames = twMerge(
      'focus-visible:envis-outline flex gap-1 text-xs underline hover:no-underline focus:outline-hidden active:scale-99',
      variant === 'toTop' &&
        'group px-0 py-2 text-sm underline underline-offset-8 hover:text-moss-green-90 hover:underline',
      className,
    )

    return (
      <button
        ref={ref}
        {...rest}
        {...(variant === 'toTop'
          ? { onClick: handleScrollToTop }
          : { onClick })}
        type='button'
        className={classNames}
      >
        {iconData && (
          <TransformableIcon iconData={iconData} className={iconClassName} />
        )}
        {children}
      </button>
    )
  },
)
