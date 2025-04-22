import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { ArrowRight } from '../../icons'
import { useIntl } from 'react-intl'

export type LinkProps = BaseLinkProps

/** Regular link style for use*/
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, type = 'internalUrl', className = '', href = '', ...rest },
  ref,
) {
  const intl = useIntl()

  const classNames = twMerge(
    `text-slate-blue-95
    dark:text-white-100
    w-fit 
    inline-flex
    items-center
    underline
    hover:text-norwegian-woods-100
    dark:hover:text-slate-blue-95
  `,
    className,
  )

  return (
    <BaseLink className={classNames} type={type} ref={ref} href={href} {...rest}>
      {children}
      {type === 'externalUrl' && (
        <ArrowRight
          aria-hidden="false"
          aria-label={`, ${intl.formatMessage({ id: 'externalLink', defaultMessage: 'External link' })}`}
          className="text-no inline-block pb-1 -rotate-45 origin-center"
        />
      )}
    </BaseLink>
  )
})

export default Link
