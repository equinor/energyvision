import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { LinkType } from '../../types/types'
import { ButtonProps, commonButtonStyling, getVariant } from '../Button/Button'

export type ButtonLinkProps = {
  /** What kind of content is it  */
  type?: LinkType
} & Pick<ButtonProps, 'variant'> &
  Omit<BaseLinkProps, 'type'>

/** Read more link style */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { children, type = 'internalUrl', variant = 'outlined', className = '', href = '', ...rest },
  ref,
) {
  const classNames = twMerge(commonButtonStyling, getVariant(variant), className)

  // What is files link external? Should not be nextlink?
  return (
    <BaseLink className={classNames} ref={ref} type={type} href={href} {...rest}>
      {children}
    </BaseLink>
  )
})
export default ButtonLink
