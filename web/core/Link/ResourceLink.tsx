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
  const classNames = twMerge(
    `group
    relative
    flex
    flex-col
    gap-0
    w-full
    text-slate-blue-95
    dark:text-white-100
    pt-5
    border-b
    border-grey-40
    dark:border-white-100
    no-underline
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
    max-h-[25px]
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
      <span className="grid grid-cols-[1fr_max-content] gap-14 items-end pb-5 pr-2">
        {children}
        <ArrowRight className={iconClassNames} />
      </span>
      <span className="w-[0%] h-[1px] bg-grey-40 transition-all duration-300 group-hover:w-full" />
    </BaseLink>
  )
})
export default ResourceLink
