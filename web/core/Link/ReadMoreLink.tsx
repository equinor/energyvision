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
    `relative
    group
    inline-block
    align-baseline
    w-max
    text-slate-80
    leading-0
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
    `inline-block
    text-energy-red-100
    ${type === 'externalUrl' ? '-rotate-45' : ''}
    dark:text-white-100
    ml-2
    group-hover:translate-x-2
    transition-all
  `,
    iconClassName,
  )

  return (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      {children}
      <Icon data={arrow_forward} size={16} className={iconClassNames} />
    </BaseLink>
  )
})
export default ReadMoreLink
