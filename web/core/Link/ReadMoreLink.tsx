import { forwardRef } from 'react'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward } from '@equinor/eds-icons'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'

export type ReadMoreLinkProps = {
  /** Overriding styles for the icon  */
  iconClassName?: string
} & BaseLinkProps

/** Read more link style */
export const ReadMoreLink = forwardRef<HTMLAnchorElement, ReadMoreLinkProps>(function Link(
  { children, type = 'internalUrl', className = '', iconClassName = '', href = '', ...rest },
  ref,
) {
  const classNames = twMerge(
    `
    relative
    inline-flex
    w-max
    text-slate-80
    no-underline
    hover:underline
    underline-offset-8
    transition-all
    duration-300
    after:content-['']
    after:absolute
    after:bottom-0
    after:left-0
    after:border-b
    after:border-slate-80
    after:w-[0%]
    after:hover:w-full
  `,
    className,
  )
  const iconClassNames = twMerge(
    `text-energy-red-100
    ${type === 'externalUrl' ? '-rotate-45' : ''}
    dark:text-white-100
    ml-sm
    hover:pl-md
  `,
    iconClassName,
  )

  return type === 'externalUrl' ? (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      {children}
      <Icon data={arrow_forward} size={16} className={iconClassNames} />
    </BaseLink>
  ) : (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      {children}
    </BaseLink>
  )
})
export default ReadMoreLink
