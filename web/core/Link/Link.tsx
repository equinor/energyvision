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
    `text-slate-blue-95
    w-max 
    inline-flex
    items-center
    gap-0.5
    underline
    hover:no-underline
  `,
    className,
  )

  return (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      {children}
      {type === 'externalUrl' && (
        <Icon data={arrow_forward} className="inline-block -rotate-45" style={{ all: 'revert-layer' }} />
      )}
    </BaseLink>
  )
})

export default Link
