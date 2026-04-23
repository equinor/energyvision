import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import type { LinkType } from '../../types/index'
import { type ButtonProps, commonButtonStyling, getVariant } from '../Button'
import { BaseLink, type BaseLinkProps } from './BaseLink'

export type ButtonLinkProps = {
  /** What kind of content is it  */
  type?: LinkType
} & Pick<ButtonProps, 'variant'> &
  Omit<BaseLinkProps, 'type'>

/** Read more link style */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    {
      children,
      type = 'internalUrl',
      variant = 'contained',
      className = '',
      href = '',
      onClick,
    },
    ref,
  ) {
    const classNames = twMerge(
      commonButtonStyling,
      getVariant(variant),
      className,
    )

    return (
      <BaseLink
        className={classNames}
        skipInternalStyle
        ref={ref}
        type={type}
        href={href}
        onClick={onClick}
      >
        {children}
      </BaseLink>
    )
  },
)
export default ButtonLink
