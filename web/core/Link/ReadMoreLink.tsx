import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { ArrowRight } from '../../icons'

export type ReadMoreLinkProps = {
  /** Overriding styles for the icon  */
  iconClassName?: string
} & BaseLinkProps

/** Read more link style */
export const ReadMoreLink = forwardRef<HTMLAnchorElement, ReadMoreLinkProps>(function ReadMoreLink(
  { children, type = 'internalUrl', className = '', iconClassName = '', href = '', ...rest },
  ref,
) {
  const classNames = twMerge(
    `
    group
    inline-flex
    align-baseline
    w-max
    text-slate-80
    leading-0
  `,
    className,
  )
  const contentClassNames = `
  relative
  after:content-['']
  after:block
  after:absolute
  after:bottom-0
  after:left-0
  after:border-b
  after:border-slate-80
  dark:after:border-white-100
  after:w-[0%]
  after:transition-all
  after:duration-300
  group-hover:after:w-full
  `
  const iconClassNames = twMerge(
    `
    text-energy-red-100
    ${type === 'externalUrl' ? '-rotate-45' : ''}
    dark:text-white-100
    ml-2
    group-hover:translate-x-2
    transition-all
    duration-300
  `,
    iconClassName,
  )

  return (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      <span className={contentClassNames}>{children}</span>
      <ArrowRight className={iconClassNames} />
    </BaseLink>
  )
})
export default ReadMoreLink
