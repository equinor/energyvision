import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { LinkType } from '../../types/types'
import { ArrowRight } from '../../icons'

export type ResourceLinkProps = {
  /** Overriding styles for the icon  */
  iconClassName?: string
  /** What kind of content is it  */
  type?: LinkType
} & Omit<BaseLinkProps, 'type'>

/** Read more link style */
export const ResourceLink = forwardRef<HTMLAnchorElement, ResourceLinkProps>(function ResourceLink(
  { children, type = 'internalUrl', className = '', iconClassName = '', href = '', ...rest },
  ref,
) {
  const afterHoverBorderBottom = `
  after:content-['']
  after:absolute
  after:-bottom-[-0.5px]
  after:left-0
  after:sp
  after:w-[0%]
  after:transition-all
  after:h-[0.5px]
  after:bg-grey-40
  dark:after:bg-white-100
  after:duration-300
  hover:after:w-full
  `
  const classNames = twMerge(
    `
    group
    relative
    flex
    flex-col
    w-full
    text-slate-blue-95
    dark:text-white-100
    py-5
    pr-2
    border-b
    border-grey-40
    dark:border-white-100
    no-underline
    ${afterHoverBorderBottom}
  `,
    className,
  )

  const iconRotation: Record<string, string> = {
    externalUrl: '-rotate-45',
    downloadableFile: 'rotate-90',
    downloadableImage: 'rotate-90',
    internalUrl: '',
  }

  const iconClassNames = twMerge(
    `
    text-energy-red-100
    dark:text-white-100
    justify-self-end
    ${iconRotation[type]}
    ${
      type === 'downloadableFile' || type === 'downloadableImage'
        ? 'group-hover:translate-y-2'
        : 'group-hover:translate-x-2'
    }
    transition-all
    duration-300
  `,
    iconClassName,
  )

  return (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      <span className="grid grid-cols-[auto_1fr] align-baseline">
        {children}
        <ArrowRight className={iconClassNames} />
      </span>
    </BaseLink>
  )
})
export default ResourceLink
