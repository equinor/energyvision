import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { ArrowRight } from '../../icons'

export type LinkProps = BaseLinkProps

/** Regular link style for use*/
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, type = 'internalUrl', className = '', href = '', ...rest },
  ref,
) {
  const classNames = twMerge(
    `text-slate-blue-95
    dark:text-white-100
    w-max 
    inline-flex
    items-center
    gap-2.5
    underline
    hover:no-underline
  `,
    className,
  )

  return (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      {children}
      {type === 'externalUrl' && <ArrowRight className="inline-block pt-1 -rotate-45 origin-bottom-left" />}
    </BaseLink>
  )
})

export default Link
