import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { ArrowRight } from '../../icons'
import { LinkType } from '../../types/index'

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
    w-fit
    text-slate-80
    leading-0
  `,
    className,
  )
  const contentClassNames = `
  relative
  w-fit
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
  const iconVariants: Partial<Record<LinkType, string>> = {
    internalUrl: '',
    externalUrl: '-rotate-45',
    downloadableFile: 'rotate-90',
    downloadableImage: 'rotate-90',
  }
  const iconClassNames = twMerge(
    `
    size-arrow-right
    text-energy-red-100
    dark:text-white-100
    ml-2
    ${
      type === 'downloadableFile' || type === 'downloadableImage'
        ? 'group-hover:translate-y-0.5'
        : '-translate-y-0.5 group-hover:translate-x-2'
    }
    transition-all
    duration-300
    ${iconVariants[type]}
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
