import { forwardRef } from 'react'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward } from '@equinor/eds-icons'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'

export type LinkProps = BaseLinkProps

/** Regular link style for use*/
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, type = 'internalUrl', className = '', href = '', ...rest },
  ref,
) {
  const classNames = twMerge(
    `text-mist-blue-100 
    flex 
    gap-2
    underline
    hover:no-underline
  `,
    className,
  )

  return type === 'externalUrl' ? (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      {children}
      <Icon data={arrow_forward} size={16} className="-rotate-45" />
    </BaseLink>
  ) : (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      {children}
    </BaseLink>
  )
})

export default Link
